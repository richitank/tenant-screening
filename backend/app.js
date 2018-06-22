const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const checkAuth = require('../backend/middleware/check-auth')

const app = express();

const userRoutes = require("./routes/user");

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

app.post('/api/screeningInfo', checkAuth, (req, res, next) => {
    
    const output = `<h3>
    <p>Hi, <br> There is a request for you to get a background screening done.  <br>
    <br> You'll be paying ${req.body.screeningCost} for the screening.<br>
    <p>Please go to the following link to proceed: <a href="http://localhost:4201">Get Started</a></p>
    <br>
    <p>Have questions? Please contact <a href="http://localhost:4202"> Customer Support</a></p>`;

    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'amshu.k1956@gmail.com', // generated ethereal user
        pass: 'qazwsx6969'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"OffrBox" <amshu.k1956@gmail.com>', // sender address
      to: req.body.applicantEmail, // list of receivers
      subject: 'OffrBox - Background Screening Required', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });


  //Inserting data to DB
  const signupForm = new ScreeningRequestForm({
    applicantFirstName: req.body.applicantFirstName,
    applicantLastName: req.body.applicantLastName,
    applicantEmail: req.body.applicantEmail,
    applicantPhoneNo: req.body.applicantPhoneNo,
    screeningCost: req.body.screeningCost,
    //creator: req.u
  });
//console.log(req.userData)
//return res.status(200).json({})
  signupForm.save();

  res.status(201).json({
     message: 'Email received at server succesfully' 
  });
  });
  

//Get/Fetch Data from DB
  app.get('/api/welcome', checkAuth, (req, res, next) => {
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

app.use("/api/user", userRoutes)

module.exports = app;   