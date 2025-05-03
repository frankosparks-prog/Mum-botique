const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Create a new product
router.post("/", async (req, res) => {
  try {
    const { name, description, price, category, images, isFeatured, isElegancePick } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      images,
      isFeatured,
      isElegancePick
    });

    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Update an existing product
router.put("/:id", async (req, res) => {
  try {
    const { name, description, price, category, images, isFeatured, isElegancePick } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        images,
        isFeatured,
        isElegancePick
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product: updatedProduct });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Get products by category (e.g., Dresses, Trousers)
router.get("/category/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json({ success: true, products });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Get featured products (isFeatured flag)
router.get("/featured", async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true });
    res.json({ success: true, products });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Get elegance picks (isElegancePick flag)
router.get("/elegance", async (req, res) => {
  try {
    const products = await Product.find({ isElegancePick: true });
    res.json({ success: true, products });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
