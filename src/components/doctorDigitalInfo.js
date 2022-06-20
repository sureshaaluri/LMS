import React, { useState } from 'react';  // useState is used for state management
import {useHistory, useLocation} from 'react-router-dom';
import { userInfoContext } from "./userContext";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { userName, userPassword } from './config';

// using functional components, creating doctor digital address form using react hooks
function DoctorDigiInfo() {
    // console.log(JSON.stringify(props.patientData.UserDetails))
  const history = useHistory();  
  var location        =   useLocation();
//   let {setuserToken, userToken}       =   React.useContext(userInfoContext);
//   let memberToken = {"token":userToken}

  // Declaring a new state variable
  const [PatientDoctorDetails, setPatientDoctorDetails] = useState({})
  const [msg, setMsg]   =   useState('');
  const [err, setErr]   =   useState('');
  let PageInfo;
  let userInfo = location.state.userData.message
  console.log("doctorInfo "+JSON.stringify(userInfo))
  let patientInfo = location.state.patientData.message
  console.log("patientInfo "+JSON.stringify(patientInfo))
  
      // using fetch referring patient to a doctor
  const DoctorPatient = async (PatientDetails,DoctorDetails)=>{
      // updating state variables
    PatientDoctorDetails.patientDigiAddress = PatientDetails; 
    PatientDoctorDetails.doctorDigiAddress = DoctorDetails;
    PatientDoctorDetails.allotedDateTime = Date();

    // let userName        =   "admin";
    // let userPassword    =   "pass@word~1234"; //Todo : need to set in config file.

    console.log(PatientDoctorDetails.patientDigiAddress,PatientDoctorDetails.doctorDigiAddress)

    let patientReferDoctor  =   {
        "doctor_id":PatientDoctorDetails.doctorDigiAddress,
        "patient_id":PatientDoctorDetails.patientDigiAddress
    }
    //   await setPatientDoctorDetails({'patientDigiAddress':PatientDetails,'doctorDigiAddress':DoctorDetails,'allotedDateTime':Date()})
    //   alert(JSON.stringify(PatientDoctorDetails))
    // alert("PatientDoctorDetails "+PatientDetails + DoctorDetails +new Date())
    
    
        const res = await fetch("/api3/doctor/assignPatient",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                "Authorization": "Basic "+base64_encode(`${userName}:${userPassword}`)
            },
            body:  JSON.stringify(
                patientReferDoctor              
            )
            
        })
        const data = await res.json();
        // console.log("data "+JSON.stringify(data))

        if(data.message === "Transaction has been submitted"){
            setMsg('Patient reference to doctor is successful')
        }
        else{
            setErr('Unable to refer patient to doctor')
        }
        // if(res.status === 422 || !data )
        // {
        //     window.alert("Fill all the fields");
        // }else{
        //     window.alert("Registered Successfully");
        //     history.push("/patientDetails");
        // }
  }

  

  if(userInfo.doctor_id){

    PageInfo = 
                
        <div className="row mt-12">

            <div className='col-md-4 text-center'>

            <h3>Doctor Info</h3>
        
            <div className="col-md-12">
                <label>First Name:   </label>
                {userInfo.first_name}
            </div>
            <div className="col-md-12">
                <label>Last Name:   </label>
                {userInfo.last_name}
            </div>
            <div className="col-md-12">
                <label>D.O.B:   </label>
                {userInfo.date_of_birth}
            </div>
          

            </div>

            <div className='col-md-4 text center'>

            <h3>Patient Info</h3>
            <div className="col-md-12">
                <label>First Name:   </label>
                {patientInfo.first_name}
            </div>
            <div className="col-md-12">
                <label>Last Name:   </label>
                {patientInfo.last_name}
            </div>
            <div className="col-md-12">
                <label>D.O.B:   </label>
                {patientInfo.date_of_birth}
            </div>
            </div>
            <div className='col-md-4 text center'>
            <button className='btn btn-primary' onClick={()=>DoctorPatient(patientInfo.patient_id,userInfo.doctor_id)}>Refer Patient to Doctor</button>
            </div> 

            
         {/* {patientInfo.patientKey===1 ?
        <> 
        <div className='col-md-4 text center'>

            <h3>Patient Info</h3>
            <div className="col-md-12">
                <label>First Name:   </label>
                {patientInfo.first_name}
            </div>
            <div className="col-md-12">
                <label>Last Name:   </label>
                {patientInfo.last_name}
            </div>
            <div className="col-md-12">
                <label>D.O.B:   </label>
                {patientInfo.date_of_birth}
            </div>
            </div>
            <div className='col-md-4 text center'>
            <button className='btn btn-primary' onClick={()=>DoctorPatient(patientInfo.patient_id,userInfo.doctor_id)}>Refer Patient to Doctor</button>
            
            </div>
             </>
         :
         <>
         <div className='col-md-4 text center'>

            <h3>Patient Info</h3>
         <div className="col-md-12">
                <label>First Name:   </label>
                {patientInfo.attributeNames[0].value}
            </div>
            <div className="col-md-12">
                <label>Last Name:   </label>
                {patientInfo.attributeNames[1].value}
            </div>
            </div>
            <div className='col-md-4 text center'>
            <button className='btn btn-primary' onClick={()=>DoctorPatient(patientInfo.entityDigitalAddress,userInfo.entityDigitalAddress)}>Refer Patient to Doctor</button>
            
            </div>
            </> 
         }  */}
            
            {/* <div className="col-md-12">
                <label>D.O.B:   </label>
                {patientInfo.date_of_birth}
            </div> */}
           
            
    </div>

            
    

  } else {

    PageInfo = 
    <div>No Doctor Available with this digital address, please register the doctore here <button onClick={()=>history.push('/doctorRegister')}>Doctor Registration</button></div>

  }
  
  return (
      
    <div className='container' style={{paddingTop:"6%"}}>
        <h3 style={{color:"green"}}>{msg}</h3>
        <h3 style={{color:"red"}}>{err}</h3>
        {PageInfo}
        
        
        
      </div>
     );
}

export default DoctorDigiInfo;
