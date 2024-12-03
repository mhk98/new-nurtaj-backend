const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "media"); // Set destination folder
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`; // Generate unique file name
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|webp/;
  const mimeType = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname));
  if (mimeType && extname) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file format. Supported formats: jpeg, jpg, png, gif, webp"
      )
    );
  }
};

// Configure upload for single and multiple file uploads
const uploadSingle = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5 MB limit
  fileFilter: fileFilter,
}).single("default_image");

const uploadMultiple = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5 MB limit per file
  fileFilter: fileFilter,
}).array("gallery_images", 10); // Allow up to 10 files

module.exports = {
  uploadSingle,
  uploadMultiple,
};
