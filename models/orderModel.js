const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },
  tax:{
    type: String,
    required: true,
  },
  total_tax_amount:{
    type: String,
    required: true,
  },
  total_price:{
    type: String,
    required: true,
  },
  order_date: {
    type: Date,
    required: true,
  },
  cro_name: {
    type: String,
    required: false,
  },
  items:[{
    type: mongoose.Schema.ObjectId, ref: 'Item' // `ref` is a **Model class**, not a string
  }]
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;