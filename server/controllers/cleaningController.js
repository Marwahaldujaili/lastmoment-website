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
