// const jwt=require("jsonwebtoken");
// const jsonwebtoken = require("jsonwebtoken")
const express = require("express");
const PrescriptionRequest = require("../models/prescriptionRequestSchema");
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});
// cont passwordHash = require('password-hash');
const router = express.Router();
const cors = require("cors");
router.use(cors());
const { route } = require("express/lib/application");
const authenticate = require("../auth/authentication");
const nodemailer = require("nodemailer");

const URL = process.env.URL;

// this call is to enter the prescription details of a patient


router.post("/Prescriptionrequest", async (req,res)=>{
    
    let document = req.body;
    console.log("PrescriptionRequest: "+JSON.stringify(document));
    if(!document)
    {
      return res.status(422).json({error:"Please fill the fields"});
    }
    try{
        console.log("email "+document.email + document.PrescriptionReqInfo.doctorDigiAddress)
           const queryRes = await new PrescriptionRequest(document.PrescriptionReqInfo);
           // const queryRes = new PrescriptionRequest(document);
           console.log("queryRes "+queryRes)
           const userExist = await queryRes.save();

           var transporter = await nodemailer.createTransport({
            service:'gmail',
            auth:{
                user : process.env.email,
                pass : process.env.password
            }
        });

        var mailOptions = {
            from : process.env.email,
            to : document.email,
            subject : 'Digital Address Verification',
            html : `<h2>You have a prescription request from the patient ${document.PrescriptionReqInfo.patientDigiAddress}</h2><a href="${URL}">Please click here to provide the prescription</a> `
        };

        await transporter.sendMail(mailOptions,function(err,info){
            if(err){
                console.log(err)
            }else{
                console.log("email sent "+info.response)
            }
        })


        res.status(200).json({message:"Prescription Request Submitted Successfully",status:1});
    }catch(err){
        res.send.json
        res.send().json({message:"Prescription Request Failed",status:0});
    }
})


module.exports = router;


