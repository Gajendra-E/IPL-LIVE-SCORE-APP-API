const express = require("express");
const mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var ordetRouter = require('./routes/order.js');
const fs = require('fs')
const csv = require('csv-parser')
const jwt = require('jsonwebtoken')
const axios = require('axios');
const productModel = require("./models/productModel");
let Client = require('ssh2-sftp-client');
let sftp = new Client();
var cron = require('node-cron');
const PORT = process.env.PORT || 3005;
const app = express();
// const fetch = require("node-fetch");
const mongoDB = "mongodb://127.0.0.1/titan-pr-db";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.json());
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
// app.use('/', indexRouter);
app.use('/orders', ordetRouter);
app.get("/ipl", async(req, res, next) => {
  let response = await axios.get("https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=TZttPGeQxOo41miRiimK0VtTbBljavv9QCfvF4Hyh2Q1WVT5DVXkVpYFz8By&filter[league_id]=1&&filter[starts_between]=2023-04-09,2023-04-10&include=balls,runs,bowling,batting,venue")
  res.json(response);
 });

 app.get('/',async function (req, res) {
  let response = await axios.get("https://cricket.sportmonks.com/api/v2.0/livescores?api_token=TZttPGeQxOo41miRiimK0VtTbBljavv9QCfvF4Hyh2Q1WVT5DVXkVpYFz8By&include=balls,runs,bowling,batting,venue,stage,season,league,visitorteam,localteam,scoreboards,firstumpire,secondumpire,referee,tvumpire,manofseries,manofmatch,tosswon")
  res.send(JSON.stringify(response.data));
});


 app.get("/promise/post", (req, res) => {
	axios.post("posts", {
		title: "Foo",
		body: "bar",
		userID: 1
	})
		.then(response => {
			res.status(200).json(response.data);
		})
		.catch((err) => {
			res.status(500).json({ message: err });
		});
})

async  function APIData(){
  
    let response = await axios.get("https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=TZttPGeQxOo41miRiimK0VtTbBljavv9QCfvF4Hyh2Q1WVT5DVXkVpYFz8By&filter[league_id]=1&&filter[starts_between]=2023-04-09,2023-04-10&include=balls,runs,bowling,batting,venue")
    console.log("------1--------"+JSON.stringify(response.data.data[0])+"==========================");
  
 }


//  async function getData() {
//   // const url = 'https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=TZttPGeQxOo41miRiimK0VtTbBljavv9QCfvF4Hyh2Q1WVT5DVXkVpYFz8By&filter[league_id]=1&&filter[starts_between]=2023-04-09,2023-04-10&include=balls,runs,bowling,batting,venue,stage,season,league,visitorteam,localteam,scoreboards,firstumpire,secondumpire,referee,tvumpire,manofseries,manofmatch,tosswon';
//   // const response = await fetch(url);
//   // const jsonResponse = await response.json();
//   // console.log(jsonResponse);

//   const https = require('https')
// const url = "https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=TZttPGeQxOo41miRiimK0VtTbBljavv9QCfvF4Hyh2Q1WVT5DVXkVpYFz8By&filter[league_id]=1&&filter[starts_between]=2023-04-09,2023-04-10&include=balls,runs,bowling,batting,venue,stage,season,league,visitorteam,localteam,scoreboards,firstumpire,secondumpire,referee,tvumpire,manofseries,manofmatch,tosswon";
// https.get(url, res => {
//   let data = '';
//   res.on('data', chunk => {
//     data += chunk;
//   });
//   res.on('end', () => {
//     data = JSON.parse(data);
//     console.log(JSON.stringify(data));
//   })
// }).on('error', err => {
//   console.log(err.message);
// })
// } 

// getData();

// async function SFTPServer() {
//   try {
//     let sftp1 = await sftp.connect({
//       host: '121.242.201.80',
//       port: 22,
//       username: 'etptocloudc',
//       password: '4f@!v@EGzRV$bW5',
//       keepaliveInterval: 2000,
//       keepaliveCountMax: 20
//     });
//     await sftp.fastGet('/Dev/etp/cloudcherry/Outbox/ext_s3_morph_wtch_etp_stk_product_location_balance_20221209145800.csv', './data/titan_s3_bucket_data.csv', {
//       concurrency: 640,
//       Chunksize: 47651643
//     }, function (err) {
//       if (err)
//         throw err

//     });
    
//     // let data = await sftp.list('/Dev/etp/cloudcherry/Outbox')
//     // console.log(JSON.stringify(data))
//     console.log("SFTP server data downloaded successfully")
//   }
//   catch (e) {
//     console.error(e.message);
//   }
//   finally {
//     await sftp.end()
//     await console.log('sftp_client connection closed');
//   }
// }

// async function consolidatedData() {

// //   var unixTimestamp = 1670578470
// // var date = new Date(unixTimestamp*1000);
// // console.log("Unix Timestamp:",unixTimestamp)
// // console.log("Date Timestamp:",date.getTime())
// // console.log(date)
// // console.log("Date: "+date.getDate()+
// //           "/"+(date.getMonth()+1)+
// //           "/"+date.getFullYear()+
// //           " "+date.getHours()+
// //           ":"+date.getMinutes()+
// //           ":"+date.getSeconds());
//   await console.log("data consolidation started")
//   //create Token
//   let Token = jwt.sign({ user: "Titan", possword: 'Password@123' }, process.env.JWT_PRIVATE_KEY)

//   let result = await axios.get('https://storage.googleapis.com/titan-xml-feed/worldoftitanxml.json');

//   let ecommerce_data = result.data.map(e => {
//     const obj2 = {};
//     for (const key of Object.getOwnPropertyNames(e)) {
//       obj2[key.slice(2)] = e[key];
//     }
//     return obj2
//   })

//   let filtered_ecommerce_products = ecommerce_data.filter(e => (e.availability === "In Stock" && (e.custom_label_1 === "Watches" || e.custom_label_1 === "WATCHES")))

//   const products = [];
//   fs.createReadStream('./data/titan_s3_bucket_data.csv')
//     .pipe(csv())
//     .on('data', function (row) {
//       const product = {
//         StockAson: row.StockAson,
//         Warehouse: row.Warehouse,
//         ItemNumber: row.ItemNumber,
//       }
//       products.push(product)
//     })
//     .on('end', function () {
//       //filter store items from csv data
//       let storeProducts = products.filter(e => e.Warehouse === "XCBGW")
//       //ecommerce and cvs consolidation data added into mongodb
//       const finalArr = filtered_ecommerce_products.map((e) =>

//         storeProducts.map(async (exclude) => {
//           if (exclude.ItemNumber === e.id) {
//             let filtered_obj = {}
//             filtered_obj.id = e.id
//             filtered_obj.link = e.link
//             filtered_obj.title = e.title
//             filtered_obj.description = e.description
//             filtered_obj.image_link = e.image_link
//             filtered_obj.additional_image_link = e.additional_image_link
//             filtered_obj.price = e.price
//             filtered_obj.sale_price = e.sale_price
//             filtered_obj.condition = e.condition
//             filtered_obj.brand = e.brand
//             filtered_obj.availability = e.availability
//             filtered_obj.google_product_category = e.google_product_category
//             filtered_obj.mpn = e.mpn
//             filtered_obj.gtin = e.gtin
//             filtered_obj.identifier_exists = e.identifier_exists
//             filtered_obj.gender = e.gender
//             filtered_obj.material = e.material
//             filtered_obj.collectionName = e.collection
//             filtered_obj.occasion = e.occasion
//             filtered_obj.JewelleryType = e.JewelleryType
//             filtered_obj.goldkaratage = e.goldkaratage
//             filtered_obj.type = e.type
//             filtered_obj.origin_country = e.origin_country
//             filtered_obj.custom_label_0 = e.custom_label_0
//             filtered_obj.custom_label_1 = e.custom_label_1
//             filtered_obj.custom_label_2 = e.custom_label_2
//             filtered_obj.custom_label_3 = e.custom_label_3
//             filtered_obj.custom_label_4 = e.custom_label_4
//             filtered_obj.Warehouse = "XCBGW"
//             filtered_obj.StockAson = exclude.StockAson

//             const filtered_product = await productModel.findOne({ id: filtered_obj.id });

//             if (filtered_product == null) {
//               let product = await new productModel(filtered_obj);
//               try {
//                 await product.save();
//               } catch (error) {
//                 res.status(500).send(error);
//               }
//             }
//             return filtered_obj;
//           }
//         })
//       );
//     })
//   await await console.log("data consolidation finished")
// }

// // Set up default mongoose connection
// async function monngodbCeneection() {
//   const db = await mongoose.connection;
//   db.on("error", console.error.bind(console, "connection error: "));
//   db.once("open", function () {
//     console.log("Connected successfully");
//   });
//   //drop products 
//   async function DropProductCollectionFromDB() {
//     await db.dropCollection("Product", function (
//       err,
//       result
//     ) {
//       console.log("Collection droped");
//     });

//     //download file csv file from SFTP
//     if (fs.existsSync('./data/titan_s3_bucket_data.csv')) {
//       fs.unlinkSync('./data/titan_s3_bucket_data.csv')
//       console.log("titan_s3_bucket_data.csv droped");
//     }
//   }
//   await DropProductCollectionFromDB();
//   await SFTPServer();
//   await scheduleForUpdateServer(db);

// }

// async function scheduleForUpdateServer(db) {
//   await consolidatedData();
//   const job = await cron.schedule("0 55 18 * * *", async function jobYouNeedToExecute() {
//     // Do whatever you want in here. Send email, Make  database backup or download data
//     await console.log("job schedule started at" + new Date().toLocaleString());
//     try {
//       //drop products 
//       await db.dropCollection("Product", function (
//         err,
//         result
//       ) {
//         console.log("Collection droped");
//         //download file csv file from SFTP
//         if (fs.existsSync('./data/titan_s3_bucket_data.csv')) {
//           fs.unlinkSync('./data/titan_s3_bucket_data.csv')
//           console.log("titan_s3_bucket_data.csv droped");
//         }
//       });
//     }
//     catch (err) {
//       console.log(err)
//     }
//     await SFTPServer();
//     await consolidatedData();
//   });
//   await job.start();
// }
// monngodbCeneection();


 APIData();
// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
// app.keepAliveTimeout = 61 * 1000;
// app.headersTimeout = 65 * 1000; // This should be bigger than `keepAliveTimeout + your server's expected response time`