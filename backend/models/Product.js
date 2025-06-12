const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  images: [String], // <-- store multiple images
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ["Trousers", "Tops", "Dresses", "Shoes", "Ankara", "Bra"],
    required: true,
  },
  isFeatured: { type: Boolean, default: false },
  isElegancePick: { type: Boolean, default: false },
   likes: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
