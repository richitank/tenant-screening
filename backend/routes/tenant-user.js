const express = require("express");
const TenantUser = require("../models/tenant-user")
const bcrypt = require("bcryptjs") //external package to encrypt packages
const jwt = require("jsonwebtoken");

const router = express.Router()

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
        const tenantUser = new TenantUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            applicantPhoneNo: req.body.applicantPhoneNo,
            email: req.body.email,
            password: hash
        });
        tenantUser.save()
            .then(result => {
                res.status(201).json({
                    message: "Tenant User Created",
                    res: result
                })
            })
            .catch(err => {
                res.status(500).json({
                   error:err
                })
            })
        });
});

module.exports = router;

