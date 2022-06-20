
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const open = require('open');
const md5 = require('md5');




const app = express();
app.use(express.json());
// app.use(express.urlencoded())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

dotenv.config({path:'./config.env'});

require('./DB/conn');
// const User = require('./models/userSchema');
// const PatientDoctor = require('./models/patientdoctorSchema');
// const Prescription  =   require('./models/prescriptionSchema')

const PrescriptionRequest  =   require('./models/prescriptionRequestSchema')
// const PatientMedicalHistory  =   require('./models/patientMedicalSchema')
const Credentials  =   require('./models/credentialsSchema')
app.use(require('./routes/userRoute'));
// app.use(require('./routes/patientdoctorRoute'));
// app.use(require('./routes/prescriptionRoute'));
app.use(require('./routes/prescriptionrequestRoute'));
app.use(require('./routes/credentialsRoute'));

// app.use(require('./routes/patientMedicalRoute'));
const PORT = process.env.PORT;
const URL = `http://localhost:${PORT}`

// opens the url in the default browser 

 
// specify the app to open in 
// open(URL, {app: 'firefox'});

app.listen(PORT, async function () {
    console.log(`server started at ${PORT}`);
    // open(URL);
    const username  =  'admin'
    const email     =  'admin@aetna.com'
    const userpassword  =  '123456'
    const role          =   'Admin'

    // const password = passwordHash.generate(userpassword);
    const password  =   md5(userpassword)

    // console.log(password); 


    try{
        const adminExist = await User.findOne({email:email});

        if(adminExist){

            // res.status(201).json({message:"Admin Account Already Existed",UserDetails : userExist,token:token});
            console.log("Admin Account Already Existed")

        }
        else{
             const user = new User({username,email,password,role});
            const userExist = await user.save();
            const token = await userExist.generateAuthToken();
            console.log("Admin Account Created")
            
            // res.status(201).json({message:"admin account created successfully"});
            
        }

           
        // }
    }catch(err){
        console.log(err);
    }
})