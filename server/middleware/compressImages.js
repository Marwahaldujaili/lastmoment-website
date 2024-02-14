import sharp from "sharp";

const compressImages = async (req, res, next) => {
  try {
    if (req.files) {
      await Promise.all(
        Object.entries(req.files).map(async ([fieldName, files]) => {
          if (Array.isArray(files)) {
            await Promise.all(
              files.map(async (file) => {
                await compressImage(fieldName, file);
              })
            );
          } else {
            await compressImage(fieldName, files);
          }
        })
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

const compressImage = async (fieldName, file) => {
  try {
    if (file && file.buffer) {
      console.log("Original Buffer Length:", file.buffer.length);

      file.buffer = await sharp(file.buffer)
        .resize({ width: 600, height: 400 })
        .toBuffer();

      console.log("Processed Buffer Length:", file.buffer.length);
    } else {
      console.warn("Buffer is undefined for field:", fieldName);
    }
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
};

export default compressImages;
