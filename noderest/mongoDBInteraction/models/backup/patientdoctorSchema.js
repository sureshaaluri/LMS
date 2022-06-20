// require("dotenv").config({path:"./config.env"});
const jwt=require("jsonwebtoken")
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken")
const dotenv = require("dotenv");

//schema for referring patient to doctor 
const PatientDoctorSchema = new mongoose.Schema({
    patientDigiAddress:String,
    doctorDigiAddress:String,
    allotedDateTime:String

   

})



var PatientDoctor = mongoose.model("PatientDoctorAllot", PatientDoctorSchema);

module.exports = PatientDoctor;
