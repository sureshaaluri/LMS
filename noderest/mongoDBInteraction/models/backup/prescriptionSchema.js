// require("dotenv").config({path:"./config.env"});
const jwt=require("jsonwebtoken")
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken")
const dotenv = require("dotenv");

// schema for prescription details
const PrescriptionSchema = new mongoose.Schema({
    patientDigiAddress:String,
    doctorDigiAddress:String,
    allotedDateTime:String,
    diagnosis:String,
    prescription:String

})



var Prescription = mongoose.model("PatientDoctorPrescription", PrescriptionSchema);

module.exports = Prescription;
