const express = require('express');

// const app = express();
const basicAuth = require('express-basic-auth');
const morgan = require('morgan');
const bodyParser = require('body-parser'); 


const loadingRoutes = require('./api/routes/patient');
const doctorRoutes = require('./api/routes/doctor');


// const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const open = require('open');
const md5 = require('md5');




const app = express();

// app.use(express.urlencoded())
app.use(cors())

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

dotenv.config({path:'./mongoDBInteraction/config.env'});

require('./mongoDBInteraction/DB/conn');



// const swaggerUi = require('swagger-ui-express'),
//     swaggerDocument = require('./swagger.json');


app.use(morgan('dev'));

// app.use(basicAuth({
//     users: { 'admin': 'pass@word~1234' }
// }))
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


const PrescriptionRequest  =   require('./mongoDBInteraction/models/prescriptionRequestSchema')
// const PatientMedicalHistory  =   require('./models/patientMedicalSchema')
const Credentials  =   require('./mongoDBInteraction/models/credentialsSchema')

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin','*');
    res.header("Content-Type", "text/html");
    res.header("Content-Type", "application/json");
    res.header('Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization,channel');
    if (req.method.toLowerCase() === 'options'){
        res.header('Access-Control-Allow-Methods','PUT,POST,GET,PATCH,DELETE');
        return res.status(200).json({});
    }
    // console.log(req.headers.channel)

    //     if(req.headers.channel === null || req.headers.channel === undefined  || req.headers.channel === "" || !/channel1[2-6]/.test(req.headers.channel)){
    //         console.log(req.headers.channel)
    //         return res.status(500).json({message:"channel is not specified in headers or invalid channel"})
    //     }
    
    next();
});
app.use('/patient',basicAuth({ users: { 'admin': 'pass@word~1234' }}),loadingRoutes);
app.use('/doctor',basicAuth({ users: { 'admin': 'pass@word~1234' }}),doctorRoutes);

app.use(require('./mongoDBInteraction/routes/userRoute'));

app.use(require('./mongoDBInteraction/routes/prescriptionrequestRoute'));
app.use(require('./mongoDBInteraction/routes/credentialsRoute'));

app.use((req,res,next)=>{
    res.status(200).json({
        message : 'It Works!'
    });
});

app.use((error,req,res,next) =>{
    res.status(error.status ||500);
    res.json({
        error : {
            message : error.message
        }
    });
});

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
module.exports= app;

