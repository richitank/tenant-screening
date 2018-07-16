const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const screeningRoutes = require("./routes/screeningRequestForms")
const userRoutes = require("./routes/user");
const tenantViewRoutes = require("./routes/tenantView")
const customerSupportRoutes = require("./routes/customerSupport/customerSupport")
const tenantUserRoutes = require("./routes/tenant-user")
const tenatAppForm = require("./routes/tenantAppForm")


//MongoDB connection in node.js
mongoose.connect("mongodb+srv://amshu:" + process.env.MONGO_ATLAS_PW + "@cluster0-cam55.mongodb.net/offrBox")
    .then(() => {
        console.log("MongoDB connected...");
    })
    .catch((error) => {
        console.log('Connection failed' + error);
    })


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


app.use("/api/screeningInfo", screeningRoutes)
app.use("/api/user", userRoutes);
app.use("/api/getInfo", tenantViewRoutes)
app.use("/api/customerSupport/feedback", customerSupportRoutes)

app.use("/api/tenant-user", tenantUserRoutes)
app.use("/api/tenant/tenant-application-form", tenatAppForm)

module.exports = app;   