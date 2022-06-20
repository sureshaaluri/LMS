// const jwt=require("jsonwebtoken");
// const jsonwebtoken = require("jsonwebtoken")
const express = require("express");
const Prescription = require("../models/prescriptionSchema");
const dotenv = require("dotenv");
// cont passwordHash = require('password-hash');
const router = express.Router();
const cors = require("cors");
router.use(cors());
const { route } = require("express/lib/application");
const authenticate = require("../auth/authentication");

// this call is to enter the prescription details of a patient
router.post("/prescription",authenticate,async(req,res)=>{
    // console.log('digi')
    let document = req.body;
    console.log(JSON.stringify(document));
    if(!document)
    {
        return res.status(422).json({error:"Please fill the fields"});
    }
    try{
            const user = new Prescription(document.UserDetails);
           const userExist = await user.save();
           

        res.status(200).json({message:"Prescription, Diagnosis Info Provided Successfully",status:1});
    }catch(err){
        res.send.json
        res.send().json({message:"PPrescription, Diagnosis Info Failed",status:0});
    }
})

//Fetch Patient Prescription Details
router.post("/getPrescriptionDetails",authenticate,async(req,res)=>{
    // console.log('digi')
    let document = req.body;
    console.log("prescription Info:"+JSON.stringify(document));
    if(!document)
    {
    return res.status(422).json({error:"Please fill the fields"});
    }
    try{
    // const user = new Prescription(document.UserDetails);
    
    const patientDigitalAddr = document.PatientDigiAddress;
    console.log("patientDigitalAddr "+patientDigitalAddr)
    const prescriptionExist = await Prescription.find({patientDigiAddress:patientDigitalAddr});
    
    console.log("prescriptionExist "+JSON.stringify(prescriptionExist))
    
    if(prescriptionExist.length )
    {
        console.log('existed')
        res.status(200).json({message:"Prescription Info", info: prescriptionExist, status:1});
        
    }
    else{
        console.log('not existed')
        res.status(202).json({message:"Prescription not existed for this digital address", status:2});
    }
    }catch(err){
    // res.send.json
    res.send().json({message:"Fetching prescription Info Failed",status:0});
    }
    })

module.exports = router;

