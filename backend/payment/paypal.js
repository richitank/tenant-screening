const express = require("express");

const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');

const payment = express.Router();

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AfLwz2hMcezgA7_MTfc3QAlOCIdU7XdiZ-7HaW9dY8zGrF7WXwUWBoEtoVjXji5xJdN8GvVBAvaka9y_',
    'client_secret': 'EFciY8Dhj_HNYovOOvnvId6H_CrOCwEbfm6LK9EM7npNVEooOnAIFBRtJXnzM8R3HPh758iFuZUwl4O_'
  });

  //payment.set('view engine', 'ejs');

  payment.get('/api/payment/paypal', (req, res) => res.render("hi"))

  module.exports = payment;

