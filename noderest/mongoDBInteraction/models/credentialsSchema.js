// require("dotenv").config({path:"./config.env"});
const jwt=require("jsonwebtoken")
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken")
const dotenv = require("dotenv");


const CredentialsSchema = new mongoose.Schema({
    entityDigitalAddress:String,
    entityId:String,
    schemaName:String,
    credential_preview_ID:String,
    attributes:Array,
})



var Credentials = mongoose.model("Credentials", CredentialsSchema);

module.exports = Credentials;
