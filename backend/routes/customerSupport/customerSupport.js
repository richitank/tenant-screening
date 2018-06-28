const express = require("express")

const router = express.Router();

const nodemailer = require('nodemailer');

router.post("", (req, res, next) => {
    const output = `<h3>
    <p>Customer Feedback Details: </h3> 
    <p>Customer Name: ${req.body.customerName} </p>  
    <p>Customer Email: ${req.body.email}</p>
    <p>Subject: ${req.body.subject} </p>
    <p>Comment: ${req.body.comment} </p>
    <p>Image Uploaded: ${req.body.pic} </p>
    `;

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
      to: 'amshuman.krishnamurthy@offrbox.com', // list of receivers
      subject: 'OffrBox - New Customer Feedback', // Subject line
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
  const email = req.body;
  console.log(email);
  res.status(201).json({
     message: 'Email received at server succesfully' 
  });
  });

  router.use("", (req, res, next) => {
    const emailList = [
        {
            id: 'adfbrtbrt', 
            email: 'sujatha@sujatha.com'
        },
        {
            id: 'adsdffbrtbrt', 
            email: 'sujatha@sujji.com'
        }
    ]

    res.status(200).json(emailList);
});


module.exports = router;