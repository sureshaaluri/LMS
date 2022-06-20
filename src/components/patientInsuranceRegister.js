import React, { useState, useEffect } from 'react';   // useState is used for state management
import { useHistory, useLocation } from 'react-router-dom';
import { userInfoContext } from "./userContext";
import sha256 from 'crypto-js/sha256';
import jwt_decode from "jwt-decode";
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { URL } from './config';
import { generateOTP } from './generateOTP';
// import { VC } from './issueDoctorVC';
const axios = require("axios")

// using functional components, creating insurance form using react hooks
function PatientInsuranceRegister() {
  const location = useLocation();
  const history = useHistory();


  // Declaring a new state variables

  const [UserDetails, setUserDetails] = useState({})
  const [patientHistory, setpatientHistory] = useState({});
  const [Message, setMessage] = useState("")
  const [ErrMsg, setErrMsg] = useState("")
  const [Credentials, setCredentials] = useState({})

  //   let digitalAddress = Math.floor(Math.random() * (999999999999 - 111111111111 + 1) ) + 111111111111;
  // if(location.state){
  //     let getRegisterDetails = location.state.getUserDetails;
  //     setUserDetails(getRegisterDetails);
  //     // console.log(getRegisterDetails)
  // }


  useEffect(() => {
    if (location.state) {
      // alert("PatientMedHistory: "+JSON.stringify(location.state.getUserDetails))
      // alert("test: "+JSON.stringify(patientHistory))
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

  
  }
  
  // registering Patient
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
      history.push({ pathname: "/checkOtp", state: { sendPatientData: UserDetails, exists: 0 } })
    }


    // await tpDigitalAddrCreate();


  }

  return (

    <div className='container' style={{ paddingTop: "8%" }}>
      <h1 className='text-center'>Insurance Details</h1>
      {Message ?
        <>
          <h3 className='text-center'>{Message}</h3>

        </>
        :
        <>
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
        </>
      }
    </div>

  );
}

export default PatientInsuranceRegister;
