const express = require("express");
const Credentials = require("../models/credentialsSchema");
const dotenv = require("dotenv");
const router = express.Router();
const cors = require("cors");
router.use(cors());
const authenticate = require("../auth/authentication");
const { route } = require("express/lib/application");
// const crypto=require("crypto-js")

// const SHA256 = require("crypto-js/sha256")

router.post("/userCredentials",async(req,res)=>{
    // console.log('digi')
    let document = req.body;
    // document.Credentials.entityId = "did:cnc:"+SHA256(document.Credentials.attributes,document.Credentials.entityDigitalAddress).toString();
    // document.Credentials.attributes[0].value = "did:cnc:"+SHA256(document.Credentials.attributes[0].name,"coordinatedcare").toString();
    // console.log("entity Id" +document.Credentials.entityId)
    console.log("document "+JSON.stringify(document));
    if(!document)
    {
        return res.status(422).json({error:"Please fill the fields"});
    }
    try{
            const user = new Credentials(document.Credentials);
           const userExist = await user.save();
           

        res.status(200).json({message:"Patient Alloted successfully",status:1});
    }catch(err){
        res.send.json
        res.send().json({message:"Patient Alloted Failed",status:0});
    }
})

router.post("/credentialsCheck",async(req,res)=>{
    const document = req.body;
    var query= document.details.digitalAddress;
    
    console.log("document "+JSON.stringify(document.details.digitalAddress))
    if(!document)
    {
        return res.status(422).json({error:"Please fill the fields"});
    }
    try{
        const userExist = await Credentials.findOne({entityDigitalAddress:query});
        // const userExist = await Credentials.findOne({query});
        
        
        if(userExist)
        {
            console.log("userExist "+userExist.attributes[13].value)
            res.status(201).json({message:"Patient Credential Details",credentialID : userExist.attributes[13].value,status:1});
        }else{
            res.status(423).json({message:"Patient Credential Details not found", status:0});
        
        }
    }catch(err){
        console.log(err);
    }
})

module.exports = router;


