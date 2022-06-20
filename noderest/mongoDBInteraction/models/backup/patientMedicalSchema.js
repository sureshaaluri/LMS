// require("dotenv").config({path:"./config.env"});
const jwt=require("jsonwebtoken")
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken")
const dotenv = require("dotenv");

//schema for patient medical history
const PatientMedicalSchema = new mongoose.Schema({
    patientDigiAddress:String,
    patientMedicalHistory:String,
    createdDateTime:String
})

var PatientMedicalHistory = mongoose.model("PatientMedicalHistory", PatientMedicalSchema);

module.exports = PatientMedicalHistory;
