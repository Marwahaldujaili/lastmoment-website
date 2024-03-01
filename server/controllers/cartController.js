import CleaningProduct from "../models/CleaningProducts.js";
import Perfume from "../models/PerfumeProducts.js";
import Cart from "../models/Cart.js";

//fetch product details and price
export const fetchProductDetails = async (productId, productType) => {
  const normalizedProductType = productType.toLowerCase();

  let productDetails = {};
  switch (normalizedProductType) {
    case "cleaningproduct":
      const cleaningProduct = await CleaningProduct.findById(productId);
      if (!cleaningProduct) throw new Error("Cleaning product not found");
      productDetails = {
        name: cleaningProduct.productName,
        price: cleaningProduct.pricePerPiece,
        ...cleaningProduct.toObject(),
      };
      break;
    case "perfume":
      const perfume = await Perfume.findById(productId);
      if (!perfume) throw new Error("Perfume product not found");
      productDetails = {
        name: perfume.productName,
        price: perfume.price,
        ...perfume.toObject(),
      };
      break;
    default:
      throw new Error(`Invalid product type: ${productType}`);
  }
  return productDetails;
};

// Add to Cart
export const addToCart = async (req, res) => {
  const { sessionId, productId, quantity, productType } = req.body;

  try {
    const productDetails = await fetchProductDetails(productId, productType);
    const price = productDetails.price;

    let cart = await Cart.findOne({ sessionId });
    if (!cart) {
      cart = new Cart({ sessionId, items: [] });
    }

    const item = {
      productId,
      quantity,
      price,
      productType: productType.charAt(0).toUpperCase() + productType.slice(1),
    };

    cart.items.push(item);

    const totalPrice = cart.items.reduce(
      (acc, currItem) => acc + currItem.price * currItem.quantity,
      0
    );

    await cart.save();
    res
      .status(200)
      .json({ success: true, message: "Item added to cart", cart, totalPrice });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//update cart
export const updateCart = async (req, res) => {
  const { sessionId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex !== -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      const totalPrice = cart.items.reduce(
        (acc, currItem) => acc + currItem.price * currItem.quantity,
        0
      );

      await cart.save();
      res
        .status(200)
        .json({ success: true, message: "Cart updated", cart, totalPrice });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Update Cart Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//view cart
export const viewCart = async (req, res) => {
  const { sessionId } = req.params;
  const deliveryCost = 25;

  try {
    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const populatedItems = await Promise.all(
      cart.items.map(async (item) => {
        const model =
          item.productType === "CleaningProduct" ? CleaningProduct : Perfume;
        const productDetails = await model.findById(item.productId).lean();
        return { ...item._doc, productDetails };
      })
    );

    const totalPrice =
      populatedItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ) + deliveryCost;

    res.json({
      success: true,
      cart: {
        ...cart._doc,
        items: populatedItems,
        totalPrice,
        deliveryCost,
      },
    });
  } catch (error) {
    console.error("View Cart Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//clear cart
export const clearCart = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }
    cart.items = [];

    await cart.save();
    res.status(200).json({ success: true, message: "Cart has been cleared" });
  } catch (error) {
    console.error("Clear Cart Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//increase quantity
export const increaseCartItemQuantity = async (req, res) => {
  const { sessionId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.find((item) => item.productId.equals(productId));
    if (item) {
      item.quantity += 1;
      await cart.save();
      res.json({ success: true, message: "Item quantity increased", cart });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error increasing item quantity:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

//decrease quantity
export const decreaseCartItemQuantity = async (req, res) => {
  const { sessionId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );
    if (itemIndex !== -1 && cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
      await cart.save();
      res.json({ success: true, message: "Item quantity decreased", cart });
    } else if (cart.items[itemIndex].quantity === 1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      res.json({ success: true, message: "Item removed from cart", cart });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error decreasing item quantity:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
