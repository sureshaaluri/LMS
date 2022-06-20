import React, { useState,useEffect} from 'react';   // useState is used for state management
import {useHistory,useLocation} from 'react-router-dom';
import { userInfoContext } from "./userContext";
import sha256 from 'crypto-js/sha256';
import jwt_decode from "jwt-decode";
import { URL } from './config';

// using functional components, creating insurance form using react hooks
function Insurance() {
    const location = useLocation();
  const history = useHistory();

  
  // Declaring a new state variables
  const [UserDetails, setUserDetails] = useState({})
  const [patientHistory,setpatientHistory] = useState({});
  const [Message, setMessage] = useState("")
  const [Credentials, setCredentials] = useState({})

//   let digitalAddress = Math.floor(Math.random() * (999999999999 - 111111111111 + 1) ) + 111111111111;
// if(location.state){
//     let getRegisterDetails = location.state.getUserDetails;
//     setUserDetails(getRegisterDetails);
//     // console.log(getRegisterDetails)
// }
  

useEffect(() => {
        if(location.state){ 
            // alert("PatientMedHistory: "+JSON.stringify(location.state.getUserDetails))
            // alert("test: "+JSON.stringify(patientHistory))
        let getRegisterDetails                  =       location.state.getUserDetails;
        patientHistory.patientDigiAddress       =       location.state.getUserDetails.digitalAddress;
        patientHistory.patientMedicalHistory    =       location.state.getUserDetails.patinetMedDet;
        // getRegisterDetails.digitalAddress       =       digitalAddress;
        
        setUserDetails(getRegisterDetails);
        // getRegisterDetails.patinetMedDet        =       '';
        // console.log(getRegisterDetails)
    }
}, [UserDetails])

// updating state variable UserDetails
  let name,value;
  function InsuranceInput(event){
      
          name = event.target.name;
          value = event.target.value;
        //   console.log("UserDetails: "+name, value)

          if(name === 'companyName'){
            UserDetails.companyName = value;
          }
          else{
            UserDetails.policyNumber = value;
          }
          


        //   setUserDetails({
        //     ...UserDetails,
        //     [name] : value
        // })
        // console.log("UserDetails: "+JSON.stringify(UserDetails))
      }
      let {setuserToken, userToken}       =   React.useContext(userInfoContext);
    //   let memberToken = {"token":userToken}
     
        
       
    // UserDetails.patinetMedDet="";

      function credentialsCall(){
        
        UserDetails.role = "Patient";
    let country ="usa";
    Credentials.entityDigitalAddress = UserDetails.firstname.toLowerCase() +"."+ UserDetails.lastname.toLowerCase()+"."+country+"@dtx";
    Credentials.schemaName = "dtx-Patient";
    Credentials.attributes = [
        {
          "name" : "issuerId",
          },
          {
              "name" : "issued",
              "value" : new Date()
          },
          {
              "name" : "firstname",
              "value" : UserDetails.firstname
          },
          {
              "name" : "lastname",
              "value" : UserDetails.lastname
          },
          {
              "name" : "dateOfBirth",
              "value" : UserDetails.dob
          },
          {
              "name" : "gender",
              "value" : UserDetails.gender
          },
          {
            "name" : "weight",
            "value" : UserDetails.weight
        },
          {
              "name" : "address",
              "value" : UserDetails.address
          },
          {
              "name" : "contact",
              "value" : UserDetails.contact
          },
          {
              "name" : "digitalAddress",
              "value" : UserDetails.digitalAddress
          },
          {
              "name" : "companyName",
              "value" : UserDetails.companyName
          },
          {
              "name" : "policyNumber",
              "value" : UserDetails.policyNumber
          }, 
          {
            "name" : "did",
            "value" : UserDetails.did
        },     
        {
            "name" : "email",
            "value" : UserDetails.email
        },       
          {
              "name" : "yearOfBirth",
              "value" : new Date(UserDetails.dob).getFullYear()
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

      Credentials.entityId = "did:dtx:"+sha256(Credentials.attributes,Credentials.entityDigitalAddress).toString();
      const decodedToken = jwt_decode(userToken);
        Credentials.attributes[0].value = "did:dtx:"+sha256(decodedToken.email,Credentials.entityDigitalAddress).toString();

    }

    UserDetails.did =    credentialsCall.entityId;


    // using fetch, registering User
  const InsuranceDetails = async (e)=>{
    
    await credentialsCall();
    e.preventDefault();
        const res = await fetch(`${URL}/userRegister`,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:  JSON.stringify({
                UserDetails
            })
        })

        await fetch(`${URL}/userCredentials`,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:  JSON.stringify({
                Credentials
            })
        })

        const data = await res.json();
        

        const response = await fetch(`${URL}/patientMedicalHistory`,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:  JSON.stringify({
                patientHistory
            })
        })

        
        const dataMedicalHistory = await response.json();
        alert("User Data "+JSON.stringify(data))
        // alert("User DEtails "+JSON.stringify(UserDetails))
        // alert("History "+JSON.stringify(dataMedicalHistory.status))
        if(data.status === 1 && dataMedicalHistory.status===1){
            alert("Patient Insurance Approved")
            // history.push("/doctorRegister")
            // history.push("/doctorDetails")
            
            // sending the variable to "/doctorDetails" 
            history.push({pathname:"/doctorDetails", state:{patientInfo:data.UserDetails}})
            
        }else{
            setMessage("Patient Insurance Not Approved")
            history.push("/insurance")
        }

        
        
  }
  
  return (
      
    <div className='container' style={{paddingTop:"8%"}}>
        <h1 className='text-center'>Insurance Details</h1>
    <h3 className='text-center'>{Message}</h3>
        <form method="post" >
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
                    <button type="submit" onClick={InsuranceDetails} className="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
      </div>
     );
}

export default Insurance;
