import CleaningProduct from "../models/CleaningProducts.js";

// Create Cleaning Product with multiple image upload
export const createCleaningProduct = async (req, res) => {
  try {
    const {
      productName,
      scent,
      capacity,
      quantity,
      pricePerCarton,
      pricePerPiece,
      mainImage,
      detailsImage,
    } = req.body;

    const mainImageFile = req.files && req.files.mainImage;
    const detailsImageFile = req.files && req.files.detailsImage;

    const mainImageFilename = mainImageFile ? mainImageFile[0]?.filename : null;
    const detailsImageFilename = detailsImageFile
      ? detailsImageFile[0]?.filename
      : null;

    const newCleaningProductData = {
      productName,
      scent,
      capacity,
      quantity,
      pricePerCarton,
      pricePerPiece,
      mainImage: mainImageFilename,
      detailsImage: detailsImageFilename || null, // Set to null if detailsImage is not provided
    };

    const newCleaningProduct = new CleaningProduct(newCleaningProductData);

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
    // Map the products to include the full path to the images
    const productsWithFullPath = allCleaning.map((product) => ({
      ...product.toObject(),
      mainImage: `http://localhost:5000/cleaning/uploads/${product.mainImage}`,
      detailsImage: product.detailsImage
        ? `http://localhost:5000/cleaning/uploads/${product.detailsImage}`
        : null,
    }));
    res.status(200).json({ success: true, data: productsWithFullPath });
  } catch (error) {
    console.error("Error retrieving cleaning products:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get/View Single Cleaning Product Controller
export const getSingleCleaningProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find the cleaning product by productId
    const cleaningProduct = await CleaningProduct.findById(productId);

    if (!cleaningProduct) {
      return res
        .status(404)
        .json({ success: false, error: "Cleaning product not found" });
    }

    // Map the product to include the full path to the images
    const productWithFullPath = {
      ...cleaningProduct.toObject(),
      mainImage: `http://localhost:5000/cleaning/uploads/${cleaningProduct.mainImage}`,
      detailsImage: cleaningProduct.detailsImage
        ? `http://localhost:5000/cleaning/uploads/${cleaningProduct.detailsImage}`
        : null,
    };

    res.status(200).json({ success: true, data: productWithFullPath });
  } catch (error) {
    console.error("Error retrieving cleaning product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Edit Cleaning Product with multiple image upload
export const editCleaningProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedFields = req.body;

    // Check if req.files exists (multer adds this when files are uploaded)
    if (req.files && req.files.length > 0) {
      updatedFields.images = req.files.map((file) => file.filename);
    }

    const cleaningProduct = await CleaningProduct.findByIdAndUpdate(
      productId,
      updatedFields,
      { new: true }
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
    const { productId } = req.params;

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
