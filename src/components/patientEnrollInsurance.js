import React, { useState, useEffect } from 'react';   // useState is used for state management
import { useHistory, useLocation } from 'react-router-dom';
import { userInfoContext } from "./userContext";
import sha256 from 'crypto-js/sha256';
import jwt_decode from "jwt-decode";
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { URL } from './config';
import { generateOTP } from './generateOTP';
import { userName, userPassword } from './config';
// import { VC } from './issueDoctorVC';
const axios = require("axios")

// using functional components, creating insurance form using react hooks
function PatientEnrollInsurance() {
  const location = useLocation();
  const history = useHistory();
  let {setuserToken, userToken}     =   React.useContext(userInfoContext);
  const apitoken = "Bearer " + userToken
  console.log("apitoken " + apitoken);
  // Declaring a new state variables
  const [UserDetails, setUserDetails] = useState({})
  const [patientHistory, setpatientHistory] = useState({});
  const [Message, setMessage] = useState("")
  const [ErrMsg, setErrMsg] = useState("")
  const [Credentials, setCredentials] = useState({})

  useEffect(() => {
    if (location.state) {
      
      let getRegisterDetails = location.state.getUserDetails;
      patientHistory.patientDigiAddress = location.state.getUserDetails.digitalAddress;
      patientHistory.patientMedicalHistory = location.state.getUserDetails.patinetMedDet;
      // getRegisterDetails.digitalAddress       =       digitalAddress;

      setUserDetails(getRegisterDetails);
      // getRegisterDetails.patinetMedDet        =       '';
      // console.log(getRegisterDetails)
    }
  }, [UserDetails])

  // updating state variable UserDetails
  let name, value;
  function InsuranceInput(event) {

    name = event.target.name;
    value = event.target.value;
    //   console.log("UserDetails: "+name, value)

    if (name === 'companyName') {
      UserDetails.companyName = value;
    }
    else {
      UserDetails.policyNumber = value;
    }



    //   setUserDetails({
    //     ...UserDetails,
    //     [name] : value
    // })
    // console.log("UserDetails: "+JSON.stringify(UserDetails))
  }
  // let {setuserToken, userToken}       =   React.useContext(userInfoContext);
  // let memberToken = {"token":userToken}



  // UserDetails.patinetMedDet="";

  const credentialsCall = async (resp, getcredentialid) => {

    UserDetails.role = "Patient";
    let country = "usa";
    Credentials.entityDigitalAddress = resp.entityDigitalAddress;
    Credentials.schemaName = "dtx-Patient";
    Credentials.credential_preview_ID = getcredentialid;
    Credentials.attributes = [
      {
        "name": "issuerId",
        "value": resp.issuerId
      },
      {
        "name": "issued",
        "value": resp.createdDate
      },
      {
        "name": "firstname",
        "value": resp.firstName
      },
      {
        "name": "lastname",
        "value": resp.lastName
      },
      {
        "name": "dateOfBirth",
        "value": resp.dateOfBirth
      },
      {
        "name": "gender",
        "value": UserDetails.gender
      },
      {
        "name": "weight",
        "value": UserDetails.weight
      },
      {
        "name": "address",
        "value": UserDetails.address
      },
      {
        "name": "contact",
        "value": UserDetails.contact
      },
      {
        "name": "digitalAddress",
        "value": resp.entityDigitalAddress
      },
      {
        "name": "companyName",
        "value": UserDetails.companyName
      },
      {
        "name": "policyNumber",
        "value": UserDetails.policyNumber
      },
      {
        "name": "did",
        "value": resp.entityId
      },
      {
        "name": "email",
        "value": UserDetails.email
      },
      {
        "name": "yearOfBirth",
        "value": new Date(UserDetails.dob).getFullYear()
      },
      // {
      //     "name" : "virus",
      //     "value" : ""
      // },
      // {
      //     "name" : "checkTime",
      //     "value" : ""
      // },
      // {
      //     "name" : "checkLocation",
      //     "value" : ""
      // },
      // {
      //     "name" : "checkedBy",
      //     "value" : ""
      // },
      // {
      //     "name" : "checkFacility",
      //     "value" : ""
      // },
      // {
      //     "name" : "diagnosisMethods",
      //     "value" : ""
      // },
    ]

    Credentials.entityId = resp.entityId;

    // const decodedToken = jwt_decode(userToken);

    UserDetails.did = Credentials.entityId;

  }

  const VC = async (UserDetails, resp, apitoken) => {


    var raw = JSON.stringify({
      "entityDigitalAddress": UserDetails.digitalAddress,
      "entityId": resp.entityId,
      "schemaName": "Patient Identity",
      "attributes": [
        {
          "name": "firstName",
          "value": resp.firstName
        },
        {
          "name": "lastName",
          "value": resp.lastName
        },
        {
          "name": "height",
          "value": "175"
        },
        {
          "name": "heightUnit",
          "value": "cm"
        },
        {
          "name": "weight",
          "value": UserDetails.weight
        },
        {
          "name": "weightUnit",
          "value": "lb"
        },
        {
          "name": "gender",
          "value": UserDetails.gender
        },
        {
          "name": "primaryLanguage",
          "value": "lb"
        },
        {
          "name": "emergencyContactName",
          "value": "Ketty Commins"
        },
        {
          "name": "emergencyContactNumber",
          "value": "241-321-3707"
        },
        {
          "name": "email",
          "value": UserDetails.email
        },
        {
          "name": "emailType",
          "value": "Work"
        },
        {
          "name": "phoneNumber",
          "value": UserDetails.contact
        },
        {
          "name": "bloodType",
          "value": "B-"
        }
      ]
    });

    var requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "apikey": "HEKA5PJTHKKHYM4V595B5RUXL56VLDFB",
        "Authorization": apitoken.toString(),
      },
      body: raw,
      redirect: 'follow'
    };


    // issue VC for TP
    await fetch("/api1/api/v1/credential/credentials/issue/_direct", requestOptions)
    .then( response =>  response.json())
    .then( async (result) => {         

      console.log("result: "+JSON.stringify(result))
        const getcredentialid =  result.data.id     
        console.log("getcredentialid: "+JSON.stringify(getcredentialid))    
        await credentialsCall(resp,getcredentialid);


    })
    .catch(error => console.log('error', error));



  }





  const proc = async (e, resp) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", apitoken.toString());
    myHeaders.append("apikey", "HEKA5PJTHKKHYM4V595B5RUXL56VLDFB");

    console.log("resp from TP API: " + JSON.stringify(resp))
    // //to create and insert verifiable credentials using 3rd party API's
    // await VC(UserDetails, resp, apitoken)

    //to create and insert verifiable credentials to MongoDB
    // await credentialsCall(UserDetails, resp, Credentials, userToken);

    //to insert data to chaincode network
    // let userName = "admin";
    // let userPassword = "pass@word~1234";

    let patientDetails = {
      "patient_id": resp.entityDigitalAddress,
      "first_name": resp.firstName,
      "last_name": resp.lastName,
      "email" : UserDetails.email,
      "country_of_residence": UserDetails.cor,
      "date_of_birth": resp.dateOfBirth,
      "gender": UserDetails.gender,
      "weight": UserDetails.weight,
      "address": UserDetails.address,
      "contact_number": UserDetails.contact,
      "patient_medical_details": UserDetails.patinetMedDet

    }


    let insurance = {
      "patient_id": UserDetails.digitalAddress,
      "insurance_company_name": UserDetails.companyName,
      "policy_number": UserDetails.policyNumber
    }

    console.log("patientDetails: "+patientDetails);
    // console.log("userPassword: "+userPassword);
    // console.log("patientDetails: "+JSON.stringify(patientDetails));

    

    const res = await fetch("/api3/patient/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + base64_encode(`${userName}:${userPassword}`)
      },
      body: JSON.stringify(
        patientDetails
      )
    })



    const insu = await fetch("/api3/patient/insurance/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + base64_encode(`${userName}:${userPassword}`)
      },
      body: JSON.stringify(
        insurance
      )
    })

    const data = await res.json();
    const data_insu = await insu.json();
    
    console.log("patient res" + JSON.stringify(data));
    console.log("insurance res" + JSON.stringify(data_insu));

    await credentialsCall(resp);

    console.log("Credentials: "+JSON.stringify(Credentials));

    
    // insert user verifiable credentials to MongoDB
    await fetch(`${URL}/userCredentials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Credentials
      })
    })






    // const response = await fetch("/api4/patientMedicalHistory",{
    //     method:"POST",
    //     headers:{
    //         "Content-Type" : "application/json"
    //     },
    //     body:  JSON.stringify({
    //         patientHistory,memberToken
    //     })
    // })


    // const dataMedicalHistory = await response.json();

    if (data.message === "Transaction has been submitted") {
      // history.push({pathname:'/doctorDigitalInfo', state:{userData:data,patientData:location.state.patientInfo}});


      //fetch patient data

      const userRes = await fetch("/api3/patient/" + UserDetails.digitalAddress, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + base64_encode(`${userName}:${userPassword}`)
          // "Authorization":`Bearer ${location.state.token}`
        },
        // body:  JSON.stringify({
        //     details,memberToken
        // })

      })
      const userdata = await userRes.json();
      console.log("patient data: " + JSON.stringify(userdata))

      if (userdata.message.patient_id) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("apikey", "DNNU3KH4XMA25NZD49YM4VXCH9Q67M6M");

        var raw = JSON.stringify({
          "entityDigitalAddress": UserDetails.digitalAddress
        });

        var requestOptions = {

          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'manual'
        };

        await fetch("/api2/api/v1/dap/digital-address/authenticate", requestOptions).then(async (res, err) => {
          if (err) {
            throw err;
          } else {

            const resut = await res.json();
            console.log("res" + JSON.stringify(resut));


            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer +${resut.id_token}`);
            myHeaders.append("apikey", "DNNU3KH4XMA25NZD49YM4VXCH9Q67M6M");
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify([
              {
                "entityDigitalAddress": UserDetails.digitalAddress,
                "credentialTypes": [
                  {
                    "credentialType": "Health",
                    "validFrom": "2021-01-01T00:00:00Z",
                    "validTo": "2021-12-31T23:59:59Z"
                  },
                  {
                    "credentialType": "Identity",
                    "validFrom": "2021-01-01T00:00:00Z",
                    "validTo": "2021-12-31T23:59:59Z"
                  }
                ]
              }
            ]);

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'manual'
            };

            await fetch("/api2/api/v1/dap/consents", requestOptions).then(async (res, err) => {
              if (err) {
                console.log("err" + err);
              } else {
                const conset = await res.json();
                console.log("res" + JSON.stringify(conset));


                // history.push({ pathname: '/doctorsList', state: { PatientDigiAddress: patientDetails.patient_id } });
                // setMessage("Patient Registered successfully and Insurance Approved")
              }
            })

          }
        });


      }






      // history.push("/doctorRegister")
      // history.push("/doctorDetails")

      // sending the variable to "/doctorDetails" 
      history.push({pathname:"/checkOtp", state:{sendPatientData:data,exists:1}})

    } else {
      setMessage(data.message)
      // history.push("/insurance")
    }




  }

  const tpDigitalAddrCreate = async (e) => {

    var raw = JSON.stringify({
      "dateOfBirth": UserDetails.dob,
      "firstName": UserDetails.firstname,
      "lastName": UserDetails.lastname,
      "countryOfResidence": UserDetails.cor
    });

    var requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "apikey": "HEKA5PJTHKKHYM4V595B5RUXL56VLDFB",
        "Authorization": apitoken.toString(),
      },
      body: raw,
      redirect: 'follow'
    };

    fetch("/api1/api/v1/issuer/digital-address", requestOptions)
      .then(response => response.json())
      .then(async (result) => {

        if (result.statusCode === 400) {
          setErrMsg(result.errorMessage)
        } else {
          console.log("result: " + JSON.stringify(result));
          await proc(e, result);
          //to create and insert verifiable credentials using 3rd party API's
          await VC(UserDetails, result, apitoken)
          return true;
        }
        console.log(result)
      })
      .catch(error => console.log('error', error));
  }


  // using fetch, registering User
  const InsuranceDetails = async (e) => {
    e.preventDefault()

    let role = "patient";
    let email = UserDetails.email;
    let digitalAddress = UserDetails.digitalAddress
    console.log("email " + JSON.stringify(email));
    console.log("digitalAddress " + JSON.stringify(digitalAddress));
    console.log("role " + JSON.stringify(role));
    const getOtpRes = await generateOTP(email, digitalAddress, role)
    const data = await getOtpRes.json();
    UserDetails.otp = data.otp

    console.log("data " + JSON.stringify(data));
    if (data.status === 1) {
      history.push({ pathname: "/checkOtp", state: { sendPatientData: UserDetails, exists: 1 } })
    }


    // await tpDigitalAddrCreate();

  }

  return (

    <div className='container' style={{ paddingTop: "8%" }}>

      <h1 className='text-center'>Insurance Details</h1>
      <h3 className='text-center'>{Message}</h3>
      <h3 className='text-center'>{ErrMsg}</h3>

      <form method="post" onSubmit={InsuranceDetails}>
        <div className="row mt-2">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <label>Company Name:</label>
            <input type="text" className="form-control" onChange={InsuranceInput} id="companyName" placeholder="Enter Company Name" name="companyName" autoComplete="off" required />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <label>Policy Number:</label>
            <input type="text" className="form-control" onChange={InsuranceInput} id="policyNumber" placeholder="Enter Policy Number" name="policyNumber" autoComplete="off" required />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PatientEnrollInsurance;
