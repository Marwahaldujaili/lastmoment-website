import Perfume from "../models/PerfumeProducts.js";

// Create Controller for Perfume Products

export const createPerfume = async (req, res) => {
  try {
    const newPerfumeData = req.body; // Assuming the request body contains the data for the new perfume

    // Create a new perfume product
    const newPerfume = new Perfume(newPerfumeData);

    // Save the new perfume product to the database
    await newPerfume.save();

    res.status(201).json({ success: true, data: newPerfume });
  } catch (error) {
    console.error("Error creating perfume product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// View all Perfume Products
export const viewPerfume = async (req, res) => {
  try {
    // Retrieve all perfume products from the database
    const allPerfumes = await Perfume.find();

    res.status(200).json({ success: true, data: allPerfumes });
  } catch (error) {
    console.error("Error retrieving perfume products:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// View Single Perfume Product Controller
export const viewSinglePerfume = async (req, res) => {
  try {
    const { productId } = req.params; // Assuming productId is part of the route parameters

    // Find the perfume product by productId
    const singlePerfume = await Perfume.findById(productId);

    if (!singlePerfume) {
      return res
        .status(404)
        .json({ success: false, error: "Perfume product not found" });
    }

    res.status(200).json({ success: true, data: singlePerfume });
  } catch (error) {
    console.error("Error retrieving single perfume product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Edit Controller for Perfume Products
export const editPerfume = async (req, res) => {
  try {
    const { productId } = req.params; // Assuming productId is part of the route parameters
    const updatedFields = req.body; // Fields to be updated

    // Find the perfume product by productId and update its information
    const updatedPerfume = await Perfume.findByIdAndUpdate(
      productId,
      updatedFields,
      { new: true }
    );

    if (!updatedPerfume) {
      return res
        .status(404)
        .json({ success: false, error: "Perfume product not found" });
    }

    res.status(200).json({ success: true, data: updatedPerfume });
  } catch (error) {
    console.error("Error editing perfume product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Delete Controller for Perfume Products
export const deletePerfume = async (req, res) => {
  try {
    const { productId } = req.params; // Assuming productId is part of the route parameters

    // Find the perfume product by productId and delete it
    const deletedPerfume = await Perfume.findByIdAndDelete(productId);

    if (!deletedPerfume) {
      return res
        .status(404)
        .json({ success: false, error: "Perfume product not found" });
    }

    res
      .status(200)
      .json({ success: true, data: "Perfume product deleted successfully" });
  } catch (error) {
    console.error("Error deleting perfume product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
