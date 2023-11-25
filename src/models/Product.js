const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    desc_prod: { type: String, required: true },
    tech_info: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Product', ProductSchema);
