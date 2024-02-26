import CleaningProduct from "../models/CleaningProducts.js";
import Perfume from "../models/PerfumeProducts.js";
import Cart from "../models/Cart.js";

//fetch product details and price

export const fetchProductDetails = async (productId, productType) => {
  // Normalize the productType to lowercase
  const normalizedProductType = productType.toLowerCase();

  let productDetails = {};
  switch (normalizedProductType) {
    case "cleaningproduct": // Now expecting lowercase
      const cleaningProduct = await CleaningProduct.findById(productId);
      if (!cleaningProduct) throw new Error("Cleaning product not found");
      productDetails = {
        name: cleaningProduct.productName,
        price: cleaningProduct.pricePerPiece,
        ...cleaningProduct.toObject(),
      };
      break;
    case "perfume": // Already lowercase
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

// Add to Cart Controller
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
      productType: productType.charAt(0).toUpperCase() + productType.slice(1), // Ensure correct enum format
    };

    // Add new item to cart
    cart.items.push(item);

    // Optionally, calculate the total price of the cart after addition
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
        // Remove item from cart
        cart.items.splice(itemIndex, 1);
      } else {
        // Update item quantity
        cart.items[itemIndex].quantity = quantity;
      }

      // Calculate the total price after update
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

  try {
    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Initialize an array to hold the populated items and calculate total price
    let totalPrice = 0;
    const populatedItems = await Promise.all(
      cart.items.map(async (item) => {
        const productModel =
          item.productType === "CleaningProduct" ? CleaningProduct : Perfume;
        const productDetails = await productModel
          .findById(item.productId)
          .lean();

        // Calculate the total price
        totalPrice += item.quantity * item.price;

        return {
          ...item,
          productDetails,
        };
      })
    );

    const populatedCart = {
      ...cart.toObject(),
      items: populatedItems,
      totalPrice, // Add the total price to the response
    };

    res.status(200).json({ success: true, cart: populatedCart });
  } catch (error) {
    console.error("View Cart Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

//clear cart
export const clearCart = async (req, res) => {
  const { sessionId } = req.params; // Assuming the sessionId is passed as a URL parameter

  try {
    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Clear the items array
    cart.items = [];

    await cart.save();
    res.status(200).json({ success: true, message: "Cart has been cleared" });
  } catch (error) {
    console.error("Clear Cart Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
