const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const dotenv = require("dotenv");
const jwt_decode = require("jwt-decode");
const express = require("express");
const router = express.Router();

//this call is used for authentication
const authenticate = async (req,res,next) =>{
try{
    // const token = req.cookies.jwtoken;
    // const token = JSON.parse(localStorage.getItem("userToken"));
    const setToken = req.body.memberToken.token;
    const verifyToken = jwt_decode(setToken);
    
    // const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
    console.log("setToken "+JSON.stringify(setToken))
    console.log("verifyToken "+JSON.stringify(verifyToken))
    const rootUser = await User.findOne({_id:verifyToken._id,"tokens" : setToken});
console.log("rootUser " + rootUser)
    if(!rootUser){throw new Error("user not found")}

    req.setToken = setToken;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
    }catch(err){
        res.status(401).send("unauthorized : no token provided");
        console.log(err);
    }
}

module.exports = authenticate;
