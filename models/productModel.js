const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  image_link: {
    type: String,
    required: false,
  },
  additional_image_link: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: false,
  },
  sale_price: {
    type: String,
    required: false,
  },
  condition: {
    type: String,
    required: false,
  },
  brand: {
    type: String,
    required: false,
  },
  availability: {
    type: String,
    required: false,
  },
  google_product_category: {
    type: String,
    required: false,
  },
  mpn: {
    type: String,
    required: false,
  },
  gtin: {
    type: String,
    required: false,
  },
  identifier_exists: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  material: {
    type: String,
    required: false,
  },
  collectionName: {
    type: String,
    required: false,
  },
  occasion: {
    type: String,
    required: false,
  },
  JewelleryType: {
    type: String,
    required: false,
  },
  goldkaratage: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  origin_country: {
    type: String,
    required: false,
  },
  custom_label_0: {
    type: String,
    required: false,
  },
  custom_label_1: {
    type: String,
    required: false,
  },
  custom_label_1: {
    type: String,
    required: false,
  },
  custom_label_3: {
    type: String,
    required: false,
  },
  custom_label_4: {
    type: String,
    required: false,
  },
  Warehouse: {
    type: String,
    required: false,
  },
  StockAson: {
    type: String,
    required: false,
  }
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;