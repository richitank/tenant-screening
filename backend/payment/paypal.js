const express = require("express");

const bodyParser = require("body-parser")

const paypal = require('paypal-rest-sdk');

const payment = express.Router();

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AfLwz2hMcezgA7_MTfc3QAlOCIdU7XdiZ-7HaW9dY8zGrF7WXwUWBoEtoVjXji5xJdN8GvVBAvaka9y_',
    'client_secret': 'EFciY8Dhj_HNYovOOvnvId6H_CrOCwEbfm6LK9EM7npNVEooOnAIFBRtJXnzM8R3HPh758iFuZUwl4O_'
  });

payment.post('/api/purchase/paypal', (req, res, next)=> {
  res.status(201).json({
    message: 'Email received at server succesfully' 
 });
  console.log("test")
});

  module.exports = payment;

