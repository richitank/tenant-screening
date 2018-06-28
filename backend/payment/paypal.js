// const express = require("express");

// const bodyParser = require("body-parser")

// const paypal = require('paypal-rest-sdk');

// const payment = express.Router();

// payment.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, OPTIONS"
//   );
//   next();
// });

// paypal.configure({
//     'mode': 'sandbox', //sandbox or live
//     'client_id': 'AfLwz2hMcezgA7_MTfc3QAlOCIdU7XdiZ-7HaW9dY8zGrF7WXwUWBoEtoVjXji5xJdN8GvVBAvaka9y_',
//     'client_secret': 'EFciY8Dhj_HNYovOOvnvId6H_CrOCwEbfm6LK9EM7npNVEooOnAIFBRtJXnzM8R3HPh758iFuZUwl4O_'
//   });



// payment.post('', (req, res, next)=> {
//   screeningCost = req.body.screeningCost
//     const create_payment_json = {
//       "intent": "sale",
//       "payer": {
//           "payment_method": "paypal"
//       },
//       "redirect_urls": {
//           "return_url": "http://localhost:3000/api/payment/paypal/success",
//           "cancel_url": "http://localhost:3000/api/payment/paypal/cancel"
//       },
//       "transactions": [{
//           "item_list": {
//               "items": [{
//                   "name": "Screening Report",
//                   "sku": "001",
//                   "price": req.body.screeningCost,
//                   "currency": "USD",
//                   "quantity": 1
//               }]
//           },
//           "amount": {
//               "currency": "USD",
//               "total": req.body.screeningCost
//           }
//       }]
//     };

//     paypal.payment.create(create_payment_json, function (error, payment) {
//       if (error) {
//           throw error;
//       } else {
//           for(let i=0; i<payment.links.length; i++){
//             if(payment.links[i].rel === 'approval_url'){
//               //res.redirect(payment.links[i].href);
//               res.status(201).json({
//                 message: payment.links[i].href
//               })
//             }
//           }
//       }
//     });

//  });
//  payment.get('/success', (req, res, next) => {
//    const payerID = req.query.PayerID;
//    const paymentId = req.query.paymentId;

//    const execute_payment_json = {
//     "payer_id": payerID,
//     "transactions": [{
//       "amount": {
//         "currency": "USD",
//         "total": "10.00"
//       }
//     }]
//    };


//    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
//     if (error) {
//         console.log(error.response);
//         throw error;
//     } else {
//         console.log(JSON.stringify(payment));
//         res.status(201).json({
//           message: "success"
//         })
//     }
// });
// //console.log(payerID + "<<<<<<<<>>>>>>>>>>>>>> " + paymentId)

//  });

//   module.exports = payment;

