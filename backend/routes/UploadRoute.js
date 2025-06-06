const express = require("express");
const router = express.Router();
const parser = require("../middleware/cloudinaryUpload");

router.post("/image", parser.single("image"), (req, res) => {
  console.log("File received:", req.file); 
  try {
    if (!req.file) throw new Error("No file uploaded");
    res.status(200).json({
      success: true,
      imageUrl: req.file.path,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: error.message || "Upload failed" });
  }
});

module.exports = router;
