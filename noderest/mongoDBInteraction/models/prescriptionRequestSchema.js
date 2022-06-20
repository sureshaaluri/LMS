// require("dotenv").config({path:"./config.env"});
const jwt=require("jsonwebtoken")
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken")
const dotenv = require("dotenv");

// schema for prescription details
const PrescriptionSchema = new mongoose.Schema({
    patientDigiAddress:String,
    doctorDigiAddress:String,
    requestedDateTime:String,
})



var Prescription_Request_Doctor = mongoose.model("Prescription_Request_Doctor", PrescriptionSchema);

module.exports = Prescription_Request_Doctor;
