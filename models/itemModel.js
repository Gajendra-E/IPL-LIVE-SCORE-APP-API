const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  item_id: {
    type: String,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  occasion:{
    type: String,
    required: false,
  },
  strap_material:{
    type: String,
    required: false,
  },
  dial_color:{
    type: String,
    required: false,
  },
  function:{
    type: String,
    required: false,
  },
  gender:{
    type: String,
    required: false,
  },
  buying_for:{
    type: String,
    required: false,
  },
  price_range:{
    type: Array,
    required: false,
  },
  product_image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  }, 
  order_date: {
    type: Date,
    required: true,
  },
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;