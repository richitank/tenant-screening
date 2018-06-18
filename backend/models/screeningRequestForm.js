const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    applicantFirstName: {type: String, required: true},
    applicantLastName: {type: String, required: true},
    applicantEmail: {type: String, required: true},
    applicantPhoneNo: {type: Number, required: true},
    screeningCost: {type: String, required: true}, 

    // ownerFirstName: {type: String, required: true},
    // ownerLastName: {type: String, required: true},
    // email: {type: String, required: true},
    // noOfUnits: {type: Number, required: true}
});

module.exports = mongoose.model('ScreeningRequestForm', postSchema);