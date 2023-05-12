const express = require("express");
var router = express.Router();
const productModel = require("../models/productModel");
var checkAuth = require('../middleware/check-auth')

router.get("/", async (req, res) => {
  return res.send('Titan PR API');
});

router.get("/products", checkAuth, async (request, response) => {
  const products = await productModel.find({});
  try {
    return response.json({
      status: "success",
      data: products,
      message: "products fetched successfully"
    });
  } catch (error) {
    return response.json({
      status: "failed",
      data: {},
      message: "products failed to fetche"
    });
  }
});

module.exports = router;