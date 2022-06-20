// const jwt=require("jsonwebtoken");
// const jsonwebtoken = require("jsonwebtoken")
const express = require("express");
const PatientMedicalHistory = require("../models/patientMedicalSchema");
const dotenv = require("dotenv");
// cont passwordHash = require('password-hash');
const router = express.Router();
const cors = require("cors");
router.use(cors());
const authenticate = require("../auth/authentication");
const { route } = require("express/lib/application");

// this call used to get patient complete details
router.post("/patientMedicalHistory",authenticate,async(req,res)=>{
    // console.log('digi')
    let document = req.body;
    console.log(JSON.stringify(document));
    if(!document)
    {
        return res.status(422).json({error:"Please fill the fields"});
    }
    try{
            document.patientHistory.createdDateTime = new Date();
            if(document.patientHistory.patientMedicalHistory)
            {
            const user = new PatientMedicalHistory(document.patientHistory);
           const userExist = await user.save();
            }

        res.status(200).json({message:"Updated Patient medical history",status:1});
    }catch(err){
        res.send.json
        res.send().json({message:"not Updated Patient medical history",status:0});
    }
})

// this call is to get previous medical history of a patient
router.post("/getPatientMedHistory",authenticate, async(req, res) => {
    // console.log("hi history")
    let document = req.body;
    // console.log("document Med History "+document)
       
        const userExist = await PatientMedicalHistory.find({patientDigiAddress:document.digiAddressPatient});
        // console.log("userExist hi"+userExist)
        
            return res.send(userExist);                
       
    
});




module.exports = router;
