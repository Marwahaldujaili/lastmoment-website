import Cart from "../models/Cart.js"; // Update the path as per your structure
import Order from "../models/Order.js";
import stripe from "../services/stripeConfig.js"; // Ensure this points to your stripeConfig file
import { fetchProductDetails } from "../controllers/cartController.js";

export const createCheckoutSession = async (req, res) => {
  const { sessionId } = req.body;

  try {
    const cart = await Cart.findOne({ sessionId });
    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "Cart not found or is empty" });
    }

    const lineItems = await Promise.all(
      cart.items.map(async (item) => {
        const productDetails = await fetchProductDetails(
          item.productId,
          item.productType
        );

        // Ensure productDetails includes a name
        if (!productDetails.name) {
          throw new Error(
            `Product name missing for product ID: ${item.productId}`
          );
        }

        return {
          price_data: {
            currency: "aed",
            product_data: {
              name: productDetails.name,
            },
            unit_amount: Math.round(productDetails.price * 100), // Ensure this is an integer
          },
          quantity: item.quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONT_END}/success?session_id={CHECKOUT_SESSION_ID}`, // Ensure FRONT_END_URL is set in .env
      cancel_url: `${process.env.FRONT_END}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Checkout Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

// Add a new function to handle Stripe webhook events
// Updated handleStripeWebhook function to include order creation
export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET // Ensure this is set in your environment variables
    );
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Process checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Here, you'd fetch the cart using session ID or another identifier stored in the session metadata
    // For this example, let's assume cartId is stored in metadata
    const cartId = session.metadata.cartId;
    const cart = await Cart.findOne({ _id: cartId });

    if (!cart) {
      console.error("Cart not found for session:", session.id);
      return res.status(404).send("Cart not found.");
    }

    // Create an order from the cart items
    const order = new Order({
      items: cart.items.map((item) => ({
        productId: item.productId,
        productType: item.productType, // 'CleaningProduct' or 'Perfume'
        name: item.name, // You may need to ensure names are included or fetched separately
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: cart.totalPrice,
      sessionID: session.id, // Optionally use Stripe's session ID as a reference
      status: "Completed", // Or set an initial status as per your business logic
    });

    await order.save();
    console.log(`Order created successfully for session ${session.id}`);

    // Optionally, handle any post-order creation actions, such as clearing the cart
  } else {
    console.log(`Unhandled event type ${event.type}`);
  }

  // Acknowledge receipt of the event
  res.json({ received: true });
};
// controllers/orderController.js

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching order", error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    await order.remove();
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting order", error: error.message });
  }
};
