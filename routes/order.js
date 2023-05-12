const express = require("express");
var router = express.Router();
const itemModel = require("../models/itemModel.js");
const orderModel = require("../models/orderModel.js");
var checkAuth = require('../middleware/check-auth');

router.get("/", async (req, res, next) => {
  try {
    const orders = await orderModel.find().populate('items');
    return await res.json({
      status: "success",
      data: orders,
      message: "orders fetched successfully"
    });
  } catch (error) {
    return await res.json({
      status: "failed",
      data: {},
      message: "orders failed to fetch"
    });
  }
});

router.get("/day_sales", async (req, res, next) => {

  let data = {}

  try {
    const mostsoldproducts = await itemModel.aggregate(
      [
        {
          $match: { "order_date": { $gte: new Date("2023-01-20"), $lte: new Date("2023-01-26") } }
        },
        {
          $group:
          {
            _id: { "product_id": "$product_id", "title": "$title", "price": "$price" },
            total_quantity: { $sum: '$quantity' },
            total_price: { $sum: '$total_price' }
          }
        },
        {
          $sort: { total_quantity: -1 }
        }
      ]
    );
    const mostsoldbrands = await itemModel.aggregate(
      [
        {
          $match: { "order_date": { $gte: new Date("2023-01-24"), $lte: new Date("2023-01-26") } }
        },
        {
          $group:
          {
            _id: { "product_id": "$product_id", "title": "$title", "price": "$price" },
            total_quantity: { $sum: '$quantity' },
            total_price: { $sum: '$total_price' }
          }
        },
        {
          $sort: { total_quantity: -1 }
        }
      ]
    );

    data.most_sold_brands = mostsoldbrands
    data.most_sold_products = mostsoldproducts

    return await res.json({
      status: "success",
      data: data,
      message: "month sales fetched successfully"
    });
  } catch (error) {
    return await res.json({
      status: "failed",
      data: {},
      message: "month sales failed to fetch"
    });
  }

})



router.get("/pre_month_sales", async (req, res, next) => {

  let data = {}

  // ✅ Get the first day of the previous month

  function getFirstDayPreviousMonth() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth() - 1, 1);
  }

  // ✅ Get the last day of the previous month

  function getLastDayPreviousMonth() {
    const date = new Date();
    // return date
    return new Date(date.getFullYear(), date.getMonth(), 0);
  }

  try {
    const mostsoldproducts = await itemModel.aggregate(
      [
        {
          $match: { "order_date": { $gte: getFirstDayPreviousMonth(), $lt: getLastDayPreviousMonth() } }
        },
        {
          $group:
          {
            _id: { "product_id": "$product_id", "title": "$title", "price": "$price" },
            total_quantity: { $sum: '$quantity' },
            total_price: { $sum: '$total_price' }
          }
        },
        {
          $sort: { total_quantity: -1 }
        }
      ]
    );
    const mostsoldbrand = await itemModel.aggregate(
      [
        {
          $match: { "order_date": { $gte: getFirstDayPreviousMonth(), $lt: getLastDayPreviousMonth() } }
        },
        {
          $group:
          {
            _id: '$brand',
            total_quantity: { $sum: '$quantity' },
            total_price: { $sum: '$total_price' }
          }
        },
        {
          $sort: { total_quantity: -1 }
        }
      ]
    );

    data.most_sold_brands = mostsoldbrand
    data.most_sold_products = mostsoldproducts

    return await res.json({
      status: "success",
      data: data,
      message: "month sales fetched successfully"
    });
  } catch (error) {

    return await res.json({
      status: "failed",
      data: {},
      message: "month sales failed to fetch"
    });
  }

})


router.get("/current_month_sales", async (req, res, next) => {

  // ✅ Get the first day of the previous month

  function getFirstDayPreviousMonth() {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }


  // ✅ Get the last day of the previous month

  function getLastDayPreviousMonth() {
    const date = new Date();
    return date

  }

  let data = {}

  try {
    const mostsoldproducts = await itemModel.aggregate(
      [
        {
          $match: { "order_date": { $gte: getFirstDayPreviousMonth(), $lt: getLastDayPreviousMonth() } }
        },
        {
          $group:
          {
            _id: { "product_id": "$product_id", "title": "$title", "price": "$price" },
            total_quantity: { $sum: '$quantity' },
            total_price: { $sum: '$total_price' }
          }
        },
        {
          $sort: { total_quantity: -1 }
        }
      ]
    );

    const mostsoldbrand = await itemModel.aggregate(
      [
        {
          $match: { "order_date": { $gte: getFirstDayPreviousMonth(), $lt: getLastDayPreviousMonth() } }
        },
        {
          $group:
          {
            _id: '$brand',
            total_quantity: { $sum: '$quantity' },
            total_price: { $sum: '$total_price' }
          }
        },
        {
          $sort: { total_quantity: -1 }
        }
      ]
    );
    
    const mostsoldoccasion = await itemModel.aggregate(
      [
        {
          $match: { "order_date": { $gte: getFirstDayPreviousMonth(), $lt: getLastDayPreviousMonth() } }
        },
        {
          $group:
          {
            _id:'$occasion' ,
            total_quantity: { $sum: '$quantity' },
            total_price: { $sum: '$total_price' }
          }
          },
        {
          $sort: { total_quantity: -1 }
        }
      ]
    );

    const mostsoldforgender = await itemModel.aggregate(
      [
        {
          $match: { "order_date": { $gte: getFirstDayPreviousMonth(), $lt: getLastDayPreviousMonth() } }
        },
        {
          $group:
          {
            _id: '$gender',
            total_quantity: { $sum: '$quantity' },
            total_price: { $sum: '$total_price' }
          }
        },
        {
          $sort: { total_quantity: -1 }
        }
      ]
    );
    const mostsoldforstrapmaterial = await itemModel.aggregate(
      [
        {
          $match: { "order_date": { $gte: getFirstDayPreviousMonth(), $lt: getLastDayPreviousMonth() } }
        },
        {
          $group:
          {
            _id: '$strap_material',
            total_quantity: { $sum: '$quantity' },
            total_price: { $sum: '$total_price' }
          }
        },
        {
          $sort: { total_quantity: -1 }
        }
      ]
    );
    const mostsoldfordialcolor = await itemModel.aggregate(
      [
        {
          $match: { "order_date": { $gte: getFirstDayPreviousMonth(), $lt: getLastDayPreviousMonth() } }
        },
        {
          $group:
          {
            _id: '$dial_color',
            total_quantity: { $sum: '$quantity' },
            total_price: { $sum: '$total_price' }
          }
        },
        {
          $sort: { total_quantity: -1 }
        }
      ]
    );
    const mostsoldforfunction = await itemModel.aggregate(
      [
        {
          $match: { "order_date": { $gte: getFirstDayPreviousMonth(), $lt: getLastDayPreviousMonth() } }
        },
        {
          $group:
          {
            _id: '$function',
            total_quantity: { $sum: '$quantity' },
            total_price: { $sum: '$total_price' }
          }
        },
        {
          $sort: { total_quantity: -1 }
        }
      ]
    );
    const mostbuyingfor = await itemModel.aggregate(
      [
        {
          $match: { "order_date": { $gte: getFirstDayPreviousMonth(), $lt: getLastDayPreviousMonth() } }
        },
        {
          $group:
          {
            _id: '$buying_for',
            total_quantity: { $sum: '$quantity' },
            total_price: { $sum: '$total_price' }
          }
        },
        {
          $sort: { total_quantity: -1 }
        }
      ]
    );

    const mostsoldforpriceRange = await itemModel.aggregate(
      [
        {
          $match: { "order_date": { $gte: getFirstDayPreviousMonth(), $lt: getLastDayPreviousMonth() } }
        },
        {
          $group:
          {
            _id: '$price_range',
            total_quantity: { $sum: '$quantity' },
            total_price: { $sum: '$total_price' }
          }
        },
        {
          $sort: { total_quantity: -1 }
        }
      ]
    );
    data.price_range = mostsoldforpriceRange
    data.most_buying_for = mostbuyingfor
    data.most_sold_gender = mostsoldforgender
    data.most_sold_dial_color=mostsoldfordialcolor
    data.most_sold_function=mostsoldforfunction
    data.most_sold_strap_material=mostsoldforstrapmaterial
    data.most_sold_for_occasion = mostsoldoccasion
    data.most_sold_brands = mostsoldbrand
    data.most_sold_products = mostsoldproducts

    return await res.json({
      status: "success",
      data: data,
      message: "month sales fetched successfully"
    });
  } catch (error) {

    return await res.json({
      status: "failed",
      data: {},
      message: "month sales failed to fetch"
    });
  }

})


router.post("/add_order", checkAuth, async (req, res, next) => {
  let { order_number, tax, total_tax_amount, items, total_price, cro_name } = req.body

  const filtered_order = await orderModel.findOne({ order_id: order_number });

  if (filtered_order == null) {
    let order = new orderModel({
      order_id: order_number,
      tax: tax,
      total_tax_amount: total_tax_amount,
      total_price: total_price,
      order_date:new Date(Date.now()),
      cro_name: cro_name
    })

    for (let item of items) {
      const result_item = new itemModel({
        item_id: item.id,
        order_id: order.order_id,
        product_id: item.id,
        brand: item.product_name,
        title: item.title,
        occasion: item.occasion,
        strap_material: item.strap_material,
        dial_color: item.dial_color,
        function: item.function,
        gender: item.gender,
        buying_for:item.buyingFor,
        price_range:item.price_range,
        product_image: item.product_image,
        quantity: parseInt(item.item_quantity),
        price: item.price,
        total_price: item.total_price,
        order_date: new Date(Date.now()),
      });

      try {
        await result_item.save();

      }
      catch (error) {
        return await res.json({
          status: "failed",
          data: {},
          message: "order failed to add"
        });
      }

      await order.items.push(result_item)
    }

    try {
      const dataToSave = await order.save();
      return await res.json({
        status: "success",
        data: dataToSave,
        message: "order added successfully"
      });
    }
    catch (error) {
      return await res.json({
        status: "failed",
        data: {},
        message: "order failed to add"
      });
    }
  } else {
    return res.json({
      status: "failed",
      data: {},
      message: "order number already exist"
    });

  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let { cro_name } = req.body;

    const filter = { order_id: id };
    let doc = await orderModel.findOne({ order_id: id });
    if (doc !== null) {
      await orderModel.updateOne(filter, { cro_name: cro_name }, { new: true });
      doc = await orderModel.findOne({ order_id: id });
      await res.json({
        status: "success",
        data: doc,
        message: "order cro name update  successfully"
      });
    }
  }
  catch (error) {
    return await res.json({
      status: "failed",
      data: {},
      message: "order failed to update"
    });
  }
})

module.exports = router;