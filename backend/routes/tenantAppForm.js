const express = require("express");

const TenantAppForm = require("../models/tenantAppForm");

const router = express.Router();

const checkTenantAuth = require("../middleware/check-tenant-auth");

router.post("/post", checkTenantAuth, (req, res, next) => {
    const tenantAppForm = new TenantAppForm({
        
        employer: req.body.employer,
        employmentPosition: req.body.employmentPosition,
        employmentStartDate: req.body.employmentStartDate,
        employmentEndDate: req.body.employmentEndDate,
        contactFirstName: req.body.contactFirstName,
        contactLastName: req.body.contactLastName,
        contactEmail: req.body.contactEmail,
        contactPhone: req.body.contactPhone,

        incomeSource: req.body.incomeSource,
        monthlyAmount: req.body.monthlyAmount,
        addIncomeInfo: req.body.addIncomeInfo,

        residenceCity: req.body.residenceCity,
        residenceState: req.body.residenceState,
        residenceZipCode: req.body.residenceZipCode,
        residenceMoveInDate: req.body.residenceMoveInDate,
        residenceMoveOutDate: req.body.residenceMoveOutDate,

        refFirstName: req.body.refFirstName,
        refLastName: req.body.refLastName,
        refPhone: req.body.refPhone,
        refEmail: req.body.refEmail,
        refRelation: req.body.refRelation,
        refYearsKnown: req.body.refYearsKnown
    });
    tenantAppForm.save();
    res.status(201).json({
        message: "Insert Successful"
    })

})

router.get("/get", (req, res, next) => {
    TenantAppForm.find()
        .then(documents => {
            res.status(200).json({
                TenantAppForm: documents
            })
        })
})

module.exports = router;