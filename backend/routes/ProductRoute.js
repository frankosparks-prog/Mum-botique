// const express = require("express");
// const Product = require("../models/Product");
// const parser = require("../middleware/cloudinaryUpload");
// const router = express.Router();

// // ✅ Create a new product with image upload
// // router.post("/", parser.array("images", 3), async (req, res) => {
// //   try {
// //     const { name, description, price, category, isFeatured, isElegancePick } = req.body;
// //     // const images = req.files.map(file => file.path); 
 
// //    const images = req.files ? req.files.map(file => file.path) : []; // ✅ Prevent crash when no files are uploaded
// //     const newProduct = new Product({
// //       name,
// //       description,
// //       price,
// //       category,
// //       images,
// //       isFeatured,
// //       isElegancePick
// //     });

// //     await newProduct.save();
// //     res.status(201).json({ success: true, product: newProduct });
// //   } catch (err) {
// //     res.status(400).json({ success: false, message: err.message });
// //   }
// // });

// // Don't use parser.array here anymore
// router.post("/", async (req, res) => {
//   try {
//     const { name, description, price, category, isFeatured, isElegancePick, images } = req.body;

//     const newProduct = new Product({
//       name,
//       description,
//       price,
//       category,
//       images, // Already uploaded URLs
//       isFeatured,
//       isElegancePick
//     });

//     await newProduct.save();
//     res.status(201).json({ success: true, product: newProduct });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });


// // ✅ Update an existing product, optionally replacing images
// router.put("/:id", parser.array("images", 3), async (req, res) => {
//   try {
//     const { name, description, price, category, isFeatured, isElegancePick } = req.body;
//     const updateData = {
//       name,
//       description,
//       price,
//       category,
//       isFeatured,
//       isElegancePick
//     };

//     // Check if images are uploaded
//     if (req.files && req.files.length > 0) {
//       // If files are uploaded, use the Cloudinary URLs
//       updateData.images = req.files.map(file => file.path);
//     } else {
//       // If no files are uploaded, set images to an empty array or a default image
//       updateData.images = [];  // Or use a default image URL if needed, e.g.
//       // updateData.images = ["https://path/to/default/image.jpg"];
//     }

//     // Perform the update
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     res.json({ success: true, product: updatedProduct });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// // // ✅ Update an existing product, optionally replacing images
// // router.put("/:id", parser.array("images", 3), async (req, res) => {
// //   try {
// //     const { name, description, price, category, isFeatured, isElegancePick } = req.body;
// //     const updateData = {
// //       name,
// //       description,
// //       price,
// //       category,
// //       isFeatured,
// //       isElegancePick
// //     };

// //     if (req.files && req.files.length > 0) {
// //       updateData.images = req.files.map(file => file.path);
// //     }

// //     const updatedProduct = await Product.findByIdAndUpdate(
// //       req.params.id,
// //       updateData,
// //       { new: true }
// //     );

// //     if (!updatedProduct) {
// //       return res.status(404).json({ success: false, message: "Product not found" });
// //     }

// //     res.json({ success: true, product: updatedProduct });
// //   } catch (err) {
// //     res.status(400).json({ success: false, message: err.message });
// //   }
// // });

// // ✅ Delete a product
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
//     if (!deletedProduct) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }
//     res.json({ success: true, message: "Product deleted" });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// // ✅ Get all products
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.json({ success: true, products });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });


// // ✅ Get products by category
// router.get("/category/:category", async (req, res) => {
//   try {
//     const products = await Product.find({ category: req.params.category });
//     res.json({ success: true, products });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// // ✅ Get featured products
// router.get("/featured", async (req, res) => {
//   try {
//     const products = await Product.find({ isFeatured: true });
//     res.json({ success: true, products });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// // ✅ Get elegance pick products
// router.get("/elegance", async (req, res) => {
//   try {
//     const products = await Product.find({ isElegancePick: true });
//     res.json({ success: true, products });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// // ✅ Get a single product by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }
//     res.json({ success: true, product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error: " + err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const Product = require("../models/Product");
const parser = require("../middleware/cloudinaryUpload");
const router = express.Router();

//
// ─── 1) CREATE NEW PRODUCT ─────────────────────────────────────────────────────
//
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      isFeatured,
      isElegancePick,
      images: bodyImages,  // array of URLs from frontend
    } = req.body;

    // bodyImages might be undefined or an empty array if the frontend didn't send it.
    // We default to [] so Mongoose won't crash.
    const images = Array.isArray(bodyImages) ? bodyImages : [];

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      images,
      isFeatured,
      isElegancePick,
    });

    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

//
// ─── UPDATE AN EXISTING PRODUCT ─────────────────────────────────────────
router.put("/:id", parser.array("images", 3), async (req, res) => {
  try {
    // 1. Destructure everything, including images array from the JSON body
    const {
      name,
      description,
      price,
      category,
      isFeatured,
      isElegancePick,
      images: bodyImages, // <-- the existing URLs from frontend
    } = req.body;

    // 2. Build the base updateData, using bodyImages by default:
    const updateData = {
      name,
      description,
      price,
      category,
      isFeatured,
      isElegancePick,
      images: Array.isArray(bodyImages) ? bodyImages : [], 
    };

    // 3. If the admin selected new files, override images entirely:
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.path);
    }

    // 4. Perform the update in MongoDB
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.json({ success: true, product: updatedProduct });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

//
// ─── 3) DELETE A PRODUCT ────────────────────────────────────────────────────────
//
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

//
// ─── 4) GET ALL PRODUCTS ────────────────────────────────────────────────────────
//
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.json({ success: true, products });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

//
// ─── 5) GET PRODUCTS BY CATEGORY ───────────────────────────────────────────────
//
router.get("/category/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    return res.json({ success: true, products });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

//
// ─── 6) GET FEATURED PRODUCTS ─────────────────────────────────────────────────
//
router.get("/featured", async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true });
    return res.json({ success: true, products });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

//
// ─── 7) GET ELEGANCE PICK PRODUCTS ────────────────────────────────────────────
//
router.get("/elegance", async (req, res) => {
  try {
    const products = await Product.find({ isElegancePick: true });
    return res.json({ success: true, products });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

//
// ─── 8) GET A SINGLE PRODUCT BY ID ─────────────────────────────────────────────
//
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.json({ success: true, product });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Server error: " + err.message });
  }
});

module.exports = router;



// const express = require("express");
// const Product = require("../models/Product");
// const parser = require("../middleware/cloudinaryUpload");
// const router = express.Router();

// // ✅ Create a new product using image URLs (no multer needed here)
// router.post("/", async (req, res) => {
//   try {
//     const { name, description, price, category, isFeatured, isElegancePick, images } = req.body;

//     const newProduct = new Product({
//       name,
//       description,
//       price,
//       category,
//       images, // Accept Cloudinary URLs directly
//       isFeatured,
//       isElegancePick,
//     });

//     await newProduct.save();
//     res.status(201).json({ success: true, product: newProduct });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// // ✅ Update an existing product, optionally replacing images
// router.put("/:id", parser.array("images", 3), async (req, res) => {
//   try {
//     const { name, description, price, category, isFeatured, isElegancePick } = req.body;

//     const updateData = {
//       name,
//       description,
//       price,
//       category,
//       isFeatured,
//       isElegancePick,
//     };

//     // Replace images only if new ones are uploaded
//     if (req.files && req.files.length > 0) {
//       updateData.images = req.files.map(file => file.path);
//     }

//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     res.json({ success: true, product: updatedProduct });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// // ✅ Delete a product
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
//     if (!deletedProduct) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }
//     res.json({ success: true, message: "Product deleted" });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// // ✅ Get all products
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.json({ success: true, products });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// // ✅ Get products by category
// router.get("/category/:category", async (req, res) => {
//   try {
//     const products = await Product.find({ category: req.params.category });
//     res.json({ success: true, products });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// // ✅ Get featured products
// router.get("/featured", async (req, res) => {
//   try {
//     const products = await Product.find({ isFeatured: true });
//     res.json({ success: true, products });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// // ✅ Get elegance pick products
// router.get("/elegance", async (req, res) => {
//   try {
//     const products = await Product.find({ isElegancePick: true });
//     res.json({ success: true, products });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// // ✅ Get a single product by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }
//     res.json({ success: true, product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error: " + err.message });
//   }
// });

// module.exports = router;
