const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const checkAuth = require('../backend/middleware/check-auth')

const app = express();

const screeningRoutes = require("./routes/screeningRequestForms")
const userRoutes = require("./routes/user");



//const paymentRoutes = require("./payment/paypal");


//MongoDB connection in node.js
mongoose.connect("mongodb+srv://amshu:IvB34kTdk96Cgnrd@cluster0-cam55.mongodb.net/offrBox")
    .then(() => {
        console.log("MongoDB connected...");
    })
    .catch((error) => {
        console.log('Connection failed' + error);
    })

const ScreeningRequestForm = require("./models/screeningRequestForm");

app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

//Get/Fetch Data from DB for the TenantView. Called from 
app.get('/api/getInfo', (req, res, next) => {
    ScreeningRequestForm.find()
        .then(documents => {
            res.status(200).json({
                ScreeningRequestForms: documents
            });
        })
        .catch((error) => {
            console.log("Error:" + error)
        })

});


app.post("/api/payment/paypal", (req, res, next)=> { 
    console.log(req.body)
    res.status(201).json({
        message: "testtin post"
    })
});

app.use("/api/screeningInfo", screeningRoutes)
app.use("/api/user", userRoutes);
//app.use("/api/payment/paypal", paymentRoutes);

module.exports = app;   