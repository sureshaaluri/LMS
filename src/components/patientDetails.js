import React, { useState } from 'react';   // useState is used for state management
import { useHistory, useLocation } from 'react-router-dom';
import { userInfoContext } from "./userContext";
import jwt_decode from "jwt-decode";
import { URL } from './config';
import {getPatientDetails} from "./getPatientDetails";
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { PatientVerification } from './patientVerification';
import { userName, userPassword } from './config';
// using functional components, creating patient details form using react hooks
function PatientDetails() {

  const history = useHistory();
  
  // Declaring a new state variables
  const [details, setDetails] = useState({});
  const [msg, setMsg] = useState('')
  let { setuserToken, userToken } = React.useContext(userInfoContext); // access the values from parent component to use them in child component, using userInfoContext and useContext "React Hooks".
  const apitoken = "Bearer "+ userToken;
  let memberToken = { "token": userToken }
  //   console.log("memberToken "+JSON.stringify(memberToken))
  var location = useLocation();

  React.useEffect(() => {

    if (location.state) {

      setuserToken(location.state.token)
      const getToken = location.state.token
      console.log(getToken)
      // setuserToken(decodedToken);
      // fetch("/api4/authenticate",{
      //     method:"POST",
      //     headers:{
      //         "Content-Type" : "application/json"
      //     },
      //     body:  JSON.stringify({

      //         getToken
      //     })

      // })
      // const data = res.json();
    }
  }, [])



  details.role = "Patient";
  //   details.token = userToken;

  // updating state variable details
  function DetailsInput(event) {
    let name = event.target.name;
    let value = event.target.value;
    setDetails({
      ...details,
      [name]: value
    })
  }

  

  // using fetch checking whether user registered or not
  const Details = async (e) => {

    e.preventDefault();

    // alert("details " + JSON.stringify(details))


    // let userName        =   "admin";
    // let userPassword    =   "pass@word~1234";

    const res = await PatientVerification(details,userName,userPassword)
        const data = await res.json();
        console.log("patient data: "+JSON.stringify(data))  

        if(data.message.docType === "patient")
        {
          history.push({ pathname: '/patientDoctorPrescription', state: { userData: data } });
        }else{
          setMsg("Patient Doesnot Exists");
        }

    //  await getPatientDetails(details,apitoken).then(async(res,err)=>{
    //   console.log("getResult "+JSON.stringify(res));
    //   if(res && res.credentialSchemaName==="Patient Identity")
    //   {
    //   history.push({ pathname: '/patientDoctorPrescription', state: { userData: res } });
    //   }else{
    //     alert("No Patient Exists")
    //   }
    //  })
    // if(getResult){
      // console.log("getResult "+JSON.stringify(getResult))
    // }
    
    
  }
  return (

    <div className='container' style={{ paddingTop: "8%" }}>

      <h3 className='text-center'>{msg}</h3>

      <form action="/" method="POST">
        <div className="row mt-2">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <label>Patient Digital Address</label>
            <input type="text" className="form-control" id="patientAddress" onChange={DetailsInput} placeholder="Enter Patient Digital Address" name="digitalAddress" autoComplete="off" />
          </div>

          {/* <div className="col-md-4">
                <button className='btn btn-primary' onClick={()=>history.push('/patientManagementTool')}>Back</button>
                </div> */}
        </div>
        <div className="row mt-3">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <input className='btn btn-primary' type="submit" onClick={Details} value="Get Details" />
          </div>
        </div>
      </form>


    </div>
  );
}

export default PatientDetails;
