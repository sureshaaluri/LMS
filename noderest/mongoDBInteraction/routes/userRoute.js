const jwt=require("jsonwebtoken");
// const jsonwebtoken = require("jsonwebtoken")
const express = require("express");
const User = require("../models/userSchema");
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});
// cont passwordHash = require('password-hash');
const md5 = require('md5');
const router = express.Router();
const cors = require("cors");
router.use(cors());
const authenticate = require("../auth/authentication");
const { route } = require("express/lib/application");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");

//test call
router.get("/test",(req,res)=>{
    console.log('test route call');
    res.status(200).json({message:"this is test message"})
    // res.status(200).json({
    //     message : JSON.parse(result.toString())
    // })
})

// this call is for registration of patient and doctor
router.post("/userRegister",async(req,res)=>{
    let document = req.body.doctorinfoDB;
    // console.log("document "+JSON.stringify(document))
    if(!document)
    {
        return res.status(422).json({error:"Please fill the fields"});
    }
    try{
        //     const OTP = Math.floor(Math.random() * (9999 - 1111 + 1) ) + 1111;
            
        //     var transporter = nodemailer.createTransport({
        //         service:'gmail',
        //         auth:{
        //             user : process.env.email,
        //             pass : process.env.password
        //         }
        //     });
        //     if(document.role === "Patient"){
        //         document.patinetMedDet = '';
            
        //     var mailOptions = {
        //         from : process.env.email,
        //         to : document.email,
        //         subject : 'Digital Address Verification',
        //         html : `<p>Your digital address <b>${document.digitalAddress}</b> verified successfully</p>
        //         <h3>Your OTP ${OTP} </h3>`
        //     };
        // }

        if(document.role === "Doctor"){
            document.password = md5(document.password);
            }
            
            const user = new User(document);

            // console.log("details "+JSON.stringify(user));
           const userExist = await user.save();
           const token = await userExist.generateAuthToken();



        res.status(200).json({message:"registered successfully",UserDetails:userExist,otp:OTP,status:1});
    }catch(err){
        // res.send.json
        res.send().json({message:"registered Failed",status:0});
    }
})

router.post("/sendOTP",async(req,res)=>{
    console.log("hi")
    let email = req.body.email;
    let role = req.body.role;
    
    let digitalAddress = req.body.digitalAddress;
    console.log("document "+JSON.stringify(email))
    console.log("document "+JSON.stringify(role))
    console.log("document "+JSON.stringify(digitalAddress))
    console.log("document "+email)
    console.log("document "+process.env.email)
    console.log("document "+process.env.password)
    
    try{
            const OTP = Math.floor(Math.random() * (9999 - 1111 + 1) ) + 1111;
           
            var transporter = nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user : process.env.email,
                    pass : process.env.password
                }
            });
            if(role == "patient"){
                
            var mailOptions = {
                from : process.env.email,
                to : email,
                subject : 'Digital Address Verification',
                html : `<p>Your digital address <b>${digitalAddress}</b> verified successfully</p>
                <h3>Your OTP ${OTP} </h3>`
            };
        }
            transporter.sendMail(mailOptions,function(err,info){
                if(err){
                    console.log("err: "+err)
                }else{
                    console.log("email sent "+info.response)
                    res.status(200).json({message:"OTP sent successfully",otp:OTP,status:1});
                }
            })

           

        
    }catch(err){
        // res.send.json
        res.send().json({message:"registered Failed",status:0});
    }
})

// this call is for doctor login, using the credentials of the doctor like username, password
router.post("/doctorlogin",async(req,res)=>{

    
    const {username,password} = req.body;
    if(!username || !password)
    {
        return res.status(422).json({error:"Please fill the fields"});
    }
    try{
        console.log("req: "+JSON.stringify(req.body))
    //     var passwordHash = require('./lib/password-hash');

    // const hashedPassword = passwordHash.generate(password);
    const userpassword  =   md5(password)

    console
        
        const userExist = await User.findOne({username:username,password:userpassword,role:'Doctor'});
        

        if(userExist)
        {
            const token = await userExist.generateAuthToken();
            // console.log(token);

            const updateOne = User.updateOne({tokens:userExist.tokens},{tokens:token},function(err){
                if(err){
                    console.log(err)
                }else{
                    console.log("updated successfully")
                }
            })

            res.cookie("jwtoken",token,{
                expires : new Date(Date.now()+25892000000),
                httpOnly : true 
            });
            console.log(userExist,token)
            res.status(201).json({message:"Doctor login successful",UserDetails : userExist,token:token,status:1});
        }else{
            res.status(423).json({message:"incorrect doctor credentials", status:0});
        
        }
    }catch(err){
        console.log(err);
    }
})

// this is a call for user login, using the credentials of the user like username, password
router.post("/login",async(req,res)=>{
    const {username,password} = req.body;
    if(!username || !password)
    {
        return res.status(422).json({error:"Please fill the fields"});
    }
    try{

    //     var passwordHash = require('./lib/password-hash');

    // const hashedPassword = passwordHash.generate(password);
    const userpassword  =   md5(password)
        
        const userExist = await User.findOne({username:username,password:userpassword,role:'Admin'});
        if(userExist)
        {
            const token = await userExist.generateAuthToken();
            // console.log(token);

            const updateOne = User.updateOne({tokens:userExist.tokens},{tokens:token},function(err){
                if(err){
                    console.log(err)
                }else{
                    console.log("updated successfully")
                }
            })
            console.log("updateOne "+updateOne)
            res.cookie("jwtoken",token,{
                expires : new Date(Date.now()+25892000000),
                httpOnly : true 
            });
            res.status(201).json({message:"user login successful",UserDetails : userExist,token:token,status:1});
        }else{
            res.status(423).json({message:"incorrect user credentials", status:0});
        
        }
    }catch(err){
        console.log(err);
    }
})



module.exports = router;


