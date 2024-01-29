import CleaningProduct from "../models/CleaningProducts.js";

export const createCleaningProduct = async (req, res) => {
  try {
    const {
      productName,
      scent,
      capacity,
      quantity,
      pricePerCarton,
      pricePerPiece,
      image,
    } = req.body;
    // Create a new instance of the CleaningProduct model
    const newCleaningProduct = new CleaningProduct({
      productName,
      scent,
      capacity,
      quantity,
      pricePerCarton,
      pricePerPiece,
      image,
    });
    // Save the new cleaning product to the database
    await newCleaningProduct.save();

    res.status(201).json({ success: true, data: newCleaningProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// View all cleaning Products
export const viewAllCleaning = async (req, res) => {
  try {
    // Retrieve all cleaning products from the database
    const allCleaning = await CleaningProduct.find();

    res.status(200).json({ success: true, data: allCleaning });
  } catch (error) {
    console.error("Error retrieving perfume products:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get/View Single Cleaning Product Controller
export const getSingleCleaningProduct = async (req, res) => {
  try {
    const { productId } = req.params; // Assuming productId is part of the route parameters

    // Find the cleaning product by productId
    const cleaningProduct = await CleaningProduct.findById(productId);

    if (!cleaningProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Cleaning product not found" });
    }

    res.status(200).json({ success: true, data: cleaningProduct });
  } catch (error) {
    console.error("Error retrieving cleaning product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// edit

export const editCleaningProduct = async (req, res) => {
  try {
    const { productId } = req.params; // Assuming productId is part of the route parameters
    const updatedFields = req.body; // Fields to be updated

    // Find the cleaning product by productId
    const cleaningProduct = await CleaningProduct.findByIdAndUpdate(
      productId,
      updatedFields,
      { new: true } // This option returns the updated document
    );

    if (!cleaningProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Cleaning product not found" });
    }

    res.status(200).json({ success: true, data: cleaningProduct });
  } catch (error) {
    console.error("Error editing cleaning product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Delete Controller for Cleaning Products
export const deleteCleaningProduct = async (req, res) => {
  try {
    const { productId } = req.params; // Assuming productId is part of the route parameters

    // Find the cleaning product by productId and delete it
    const result = await CleaningProduct.deleteOne({ _id: productId });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "Cleaning product not found" });
    }

    res
      .status(200)
      .json({ success: true, data: "Cleaning product deleted successfully" });
  } catch (error) {
    console.error("Error deleting cleaning product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
