// const jwt=require("jsonwebtoken");
// const jsonwebtoken = require("jsonwebtoken")
const express = require("express");
const PatientDoctor = require("../models/patientdoctorSchema");
const dotenv = require("dotenv");
// cont passwordHash = require('password-hash');
const router = express.Router();
const cors = require("cors");
router.use(cors());
const authenticate = require("../auth/authentication");
const { route } = require("express/lib/application");

// this call is used to refer/assign a patient to doctor
router.post("/patientAllot",authenticate,async(req,res)=>{
    // console.log('digi')
    let document = req.body;
    console.log(JSON.stringify(document));
    if(!document)
    {
        return res.status(422).json({error:"Please fill the fields"});
    }
    try{
            const user = new PatientDoctor(document.PatientDoctorDetails);
           const userExist = await user.save();
           

        res.status(200).json({message:"Patient Alloted successfully",status:1});
    }catch(err){
        res.send.json
        res.send().json({message:"Patient Alloted Failed",status:0});
    }
})

module.exports = router;
