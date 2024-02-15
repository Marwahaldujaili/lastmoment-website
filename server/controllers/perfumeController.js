import Perfume from "../models/PerfumeProducts.js";

const BASE_URL = "http://localhost:5000/perfume/uploads/";

// Create Controller for Perfume Products
export const createPerfume = async (req, res) => {
  try {
    const { productName, capacity, price, discountedPrice, description } =
      req.body;

    const mainImageFile = req.files && req.files.mainImage;
    const detailsImageFile = req.files && req.files.detailsImage;

    const mainImageFilename = mainImageFile ? mainImageFile[0]?.filename : null;
    const detailsImageFilename = detailsImageFile
      ? detailsImageFile[0]?.filename
      : null;

    const newPerfumeData = {
      productName,
      capacity,
      price,
      discountedPrice,
      description,
      mainImage: mainImageFilename,
      detailsImage: detailsImageFilename || null, // Set to null if detailsImage is not provided
    };

    const newPerfume = new Perfume(newPerfumeData);

    await newPerfume.save();

    res.status(201).json({ success: true, data: newPerfume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// View all Perfume Products
export const viewPerfume = async (req, res) => {
  try {
    const allPerfumes = await Perfume.find();
    const productsWithFullPath = allPerfumes.map((product) => ({
      ...product.toObject(),
      mainImage: product.mainImage ? `${BASE_URL}${product.mainImage}` : null,
      detailsImage: product.detailsImage
        ? `${BASE_URL}${product.detailsImage}`
        : null,
    }));
    res.status(200).json({ success: true, data: productsWithFullPath });
  } catch (error) {
    console.error("Error retrieving perfume products:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// View Single Perfume Product Controller
export const viewSinglePerfume = async (req, res) => {
  try {
    const { productId } = req.params;

    const singlePerfume = await Perfume.findById(productId);

    if (!singlePerfume) {
      return res
        .status(404)
        .json({ success: false, error: "Perfume product not found" });
    }

    // Construct the object to include the full paths for images
    const productWithFullPath = {
      ...singlePerfume.toObject(),
      mainImage: singlePerfume.mainImage
        ? `${BASE_URL}${singlePerfume.mainImage}`
        : null,
      detailsImage: singlePerfume.detailsImage
        ? `${BASE_URL}${singlePerfume.detailsImage}`
        : null,
    };

    res.status(200).json({ success: true, data: productWithFullPath });
  } catch (error) {
    console.error("Error retrieving single perfume product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Edit Controller for Perfume Products
export const editPerfume = async (req, res) => {
  try {
    const { productId } = req.params;
    let updatedFields = req.body;

    if (req.files) {
      const mainImageFile = req.files.mainImage
        ? req.files.mainImage[0]?.filename
        : null;
      const detailsImageFile = req.files.detailsImage
        ? req.files.detailsImage[0]?.filename
        : null;

      updatedFields = {
        ...updatedFields,
        ...(mainImageFile && { mainImage: mainImageFile }),
        ...(detailsImageFile && { detailsImage: detailsImageFile }),
      };
    }

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
