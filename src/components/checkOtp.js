import React, { useState } from 'react';   // useState is used for state management
import { useHistory, useLocation } from 'react-router-dom';
import { userInfoContext } from "./userContext";
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import VC from "./patientVC";
import { userName, userPassword } from './config';
// const dotenv = require("dotenv");
// dotenv.config({path:'./config.env'});


// using functional components, creating patient details form using react hooks
function CheckOtp() {

  // console.log("user name chain code "+ userName)
  // console.log("user name chain code "+ userPassword)

  const location = useLocation();
  const history = useHistory();
  const [otp, setotp] = useState({})
  
  const [ErrMsg, setErrMsg] = useState("")
  // const [Credentials, setCredentials] = useState({})
  const [Message, setMessage] = useState("")
  const [ErrorOtp, setErrorOtp] = useState("")
  let {setuserToken, userToken}     =   React.useContext(userInfoContext);
  const apitoken = "Bearer " + userToken

  let name, value;
  function OtpInput(event) {

    name = event.target.name;
    value = event.target.value;


    setotp({
      ...otp,
      [name]: value
    })

  }

  let UserDetails = location.state.sendPatientData;
  let exists = location.state.exists;
// alert("exists "+exists)
  const SubmitOtp = async (e) => {

    e.preventDefault();
    if (otp.otp == UserDetails.otp) {
      await tpDigitalAddrCreate();

    } else {
      setErrorOtp("Enter Valid OTP");
    }

  }
  
  const tpDigitalAddrCreate = async (e) => {

    var raw = JSON.stringify({
      "dateOfBirth": UserDetails.dob,
      "firstName": UserDetails.firstname,
      "lastName": UserDetails.lastname,
      "countryOfResidence": "USA"
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
          console.log("result api1 digital address" + JSON.stringify(result))
          await proc(e, result);

          //to create and insert verifiable credentials using 3rd party API's
          await VC(UserDetails, result, apitoken);

          return true;
        }
      })
      .catch(error => console.log('error', error));


  }


  const proc = async (e, resp) => {
    console.log("resp of third party digital address " + JSON.stringify(resp));
    var myHeaders = new Headers();
    myHeaders.append("Authorization", apitoken);
    myHeaders.append("apikey", "HEKA5PJTHKKHYM4V595B5RUXL56VLDFB");

    console.log("resp from TP API: " + JSON.stringify(resp))

    

    //to create and insert verifiable credentials to MongoDB
    // await credentialsCall(UserDetails, resp, Credentials, userToken);

    //to insert data to chaincode network
    
    // const userName = process.env.userName;
    // const userPassword = process.env.userPassword;

    let patientDetails = {
      "patient_id": resp.entityDigitalAddress,
      "first_name": resp.firstName,
      "last_name": resp.lastName,
      "email": UserDetails.email,
      "country_of_residence": UserDetails.cor,
      "date_of_birth": resp.dateOfBirth,
      "gender": UserDetails.gender,
      "weight": UserDetails.weight,
      "address": UserDetails.address,
      "contact_number": UserDetails.contact,
      "patient_medical_details": UserDetails.patinetMedDet

    }

    console.log("patientDetails " + JSON.stringify(patientDetails))

    let insurance = {
      "patient_id": UserDetails.digitalAddress,
      "insurance_company_name": UserDetails.companyName,
      "policy_number": UserDetails.policyNumber
    }




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



    const insu = await fetch("/api3/patient/insurance", {
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
    console.log(patientDetails)
    console.log("patient res" + JSON.stringify(data));
    console.log("insurance res" + JSON.stringify(data_insu));

    // console.log(patientDetails, insurance)


    // //insert user verifiable credentials to MongoDB
    // await fetch(`${URL}/userCredentials`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     Credentials
    //   })
    // })






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

        },

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

                userdata.message.patientKey = 1;

                if(exists == 0){
                  history.push({ pathname: '/doctorDetails', state: { patientInfo: userdata } })
                }else if(exists == 1){
                  history.push({ pathname: '/doctorsList', state: { PatientDigiAddress: patientDetails.patient_id } });
                }
                
                setMessage("Patient Registered successfully and Insurance Approved")
              }
            })

          }
        });

      }

    } else {
      setMessage(data.message)
    }
  }


  // const VC = async (UserDetails, resp, apitoken) => {

  //   // console.log("UserDetails " + JSON.stringify(UserDetails));
  //   var myHeaders = new Headers();
  //   myHeaders.append("Authorization", apitoken.toString());
  //   myHeaders.append("apikey", "HEKA5PJTHKKHYM4V595B5RUXL56VLDFB");
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({
  //     "entityDigitalAddress": UserDetails.digitalAddress,
  //     "entityId": resp.entityId,
  //     "schemaName": "Patient Identity",
  //     "attributes": [
  //       {
  //         "name": "firstName",
  //         "value": resp.firstName
  //       },
  //       {
  //         "name": "lastName",
  //         "value": resp.lastName
  //       },
  //       {
  //         "name": "height",
  //         "value": "175"
  //       },
  //       {
  //         "name": "heightUnit",
  //         "value": "cm"
  //       },
  //       {
  //         "name": "weight",
  //         "value": UserDetails.weight
  //       },
  //       {
  //         "name": "weightUnit",
  //         "value": "lb"
  //       },
  //       {
  //         "name": "gender",
  //         "value": UserDetails.gender
  //       },
  //       {
  //         "name": "primaryLanguage",
  //         "value": "lb"
  //       },
  //       {
  //         "name": "emergencyContactName",
  //         "value": "Ketty Commins"
  //       },
  //       {
  //         "name": "emergencyContactNumber",
  //         "value": "241-321-3707"
  //       },
  //       {
  //         "name": "email",
  //         "value": UserDetails.email
  //       },
  //       {
  //         "name": "emailType",
  //         "value": "Work"
  //       },
  //       {
  //         "name": "phoneNumber",
  //         "value": UserDetails.contact
  //       },
  //       {
  //         "name": "bloodType",
  //         "value": "B-"
  //       }
  //     ]
  //   });

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };
  //   console.log(JSON.stringify(requestOptions))
  //   await fetch("/api1/api/v1/credential/credentials/issue/_direct", requestOptions)
  //     .then(response => response.json())
  //     .then((result) => {
  //       console.log("api credentials " + JSON.stringify(result))
  //       let getcredentialid = result.data.id
  //       credentialsCall(resp, getcredentialid);
  //     })
  //     .catch(error => console.log('error', error));
  // }

   

  // function credentialsCall(resp, getcredentialid) {
  //   // alert("getcredentialid " + getcredentialid)
  //   UserDetails.role = "Patient";
  //   let country = "usa";
  //   Credentials.entityDigitalAddress = resp.entityDigitalAddress;
  //   Credentials.schemaName = "dtx-Patient";
  //   Credentials.credential_preview_ID = getcredentialid;
  //   Credentials.attributes = [
  //     {
  //       "name": "issuerId",
  //       "value": resp.issuerId
  //     },
  //     {
  //       "name": "issued",
  //       "value": resp.createdDate
  //     },
  //     {
  //       "name": "firstname",
  //       "value": resp.firstName
  //     },
  //     {
  //       "name": "lastname",
  //       "value": resp.lastName
  //     },
  //     {
  //       "name": "dateOfBirth",
  //       "value": resp.dateOfBirth
  //     },
  //     {
  //       "name": "gender",
  //       "value": UserDetails.gender
  //     },
  //     {
  //       "name": "weight",
  //       "value": UserDetails.weight
  //     },
  //     {
  //       "name": "address",
  //       "value": UserDetails.address
  //     },
  //     {
  //       "name": "contact",
  //       "value": UserDetails.contact
  //     },
  //     {
  //       "name": "digitalAddress",
  //       "value": resp.entityDigitalAddress
  //     },
  //     {
  //       "name": "companyName",
  //       "value": UserDetails.companyName
  //     },
  //     {
  //       "name": "policyNumber",
  //       "value": UserDetails.policyNumber
  //     },
  //     {
  //       "name": "did",
  //       "value": resp.entityId
  //     },
  //     {
  //       "name": "email",
  //       "value": UserDetails.email
  //     },
  //     {
  //       "name": "yearOfBirth",
  //       "value": new Date(UserDetails.dob).getFullYear()
  //     },
  //     // {
  //     //     "name" : "virus",
  //     //     "value" : ""
  //     // },
  //     // {
  //     //     "name" : "checkTime",
  //     //     "value" : ""
  //     // },
  //     // {
  //     //     "name" : "checkLocation",
  //     //     "value" : ""
  //     // },
  //     // {
  //     //     "name" : "checkedBy",
  //     //     "value" : ""
  //     // },
  //     // {
  //     //     "name" : "checkFacility",
  //     //     "value" : ""
  //     // },
  //     // {
  //     //     "name" : "diagnosisMethods",
  //     //     "value" : ""
  //     // },
  //   ]

  //   Credentials.entityId = resp.entityId;

  //   // const decodedToken = jwt_decode(userToken);

  //   UserDetails.did = Credentials.entityId;

  // }

  return (

    <div className='container' style={{ paddingTop: "8%" }}>
      <div className='text-center'>
        <h1>Customer Consent</h1>
        <h3 style={{color:"red"}}>{ErrMsg}</h3>
        <h3 style={{color:"red"}}>{Message}</h3>
        
        <p style={{color:"green"}}>Please provide the OTP sent to your e-mail {UserDetails.email}</p>
      </div>

      <div className='text-center'><h2>{ErrorOtp}</h2></div>
      <form action="/" method="POST">
        <div className="row mt-2">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <label>Enter OTP</label>
            <input type="number" className="form-control" id="otp" onChange={OtpInput} placeholder="Enter OTP" name="otp" autoComplete="off" />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <input className='btn btn-primary' type="submit" onClick={SubmitOtp} value="Submit" />
          </div>
        </div>
      </form>


    </div>
  );
}

export default CheckOtp;
