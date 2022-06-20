import React, { useEffect,useState } from 'react';  // useState is used for state management
import {useHistory, useLocation} from 'react-router-dom';
import { userInfoContext } from "./userContext";
import jwt_decode from "jwt-decode";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { userName, userPassword } from './config';

// using functional components, creating patient prescription form using react hooks
function PatientDoctorPrescription() {
    // console.log(JSON.stringify(props.patientData.UserDetails))

    let {setuserToken, userToken}    =   React.useContext(userInfoContext); // access the values from parent component to use them in child component, using userInfoContext and useContext "React Hooks".
    // let memberToken = {"token":userToken}
  const history = useHistory();
  var location        =   useLocation();

  // Declaring a new state variables
  const [UserDetails, setUserDetails] = useState({
    
  })
  const [msg, setMsg] = useState('')

  const [MedicalDetails, setMedicalDetails] = useState([{}])

  useEffect(() => {
    // alert("hi")
    if(userInfo.status === 1){
        
        const digiAddressPatient = userInfo.UserDetails.digitalAddress;
        // alert("digiAddressPatient" + JSON.stringify(digiAddressPatient))
        fetch("/api4/getPatientMedHistory",{
    
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body:  JSON.stringify({
            digiAddressPatient
        })
    })
    .then(res =>res.json())
    .then(jsonRes => {
        // alert(JSON.stringify(jsonRes))
        setMedicalDetails(jsonRes)
    })
    // alert("MedicalDetails "+JSON.stringify(MedicalDetails))
}}, [])

// decoding token, getting _id and role
  const decodeTokenInfo = jwt_decode(userToken);
//   console.log("Token Info: "+JSON.stringify(decodeTokenInfo))

  let userInfo = location.state.userData.message
  console.log(JSON.stringify(userInfo))
  // console.log('Patient Digital Address: '+JSON.stringify(userInfo.UserDetails.digitalAddress))
  // console.log('Doctor Digital Address: '+JSON.stringify(decodeTokenInfo.digitalAddress))
  
// updating state variable UserDetails
  let name,value;
  function RegisterInput(event){
    //   alert('hi')
          name = event.target.name;
          value = event.target.value;
          setUserDetails({
            ...UserDetails,
            [name] : value
        })
      }
      
  
  // const Register = async (e)=>{

  //   // console.log("UserDetails: "+UserDetails)
  //   history.push({
  //       pathname: '/insurance',
  //       state: { getUserDetails: UserDetails }
  //   });
    
  // }

  // using fetch checking whether user registered or not
  const DoctorPatient = async (e)=>{
    e.preventDefault();
    // alert("hi")
    UserDetails.allotedDateTime = Date();
    // let userName        =   "admin";
    // let userPassword    =   "pass@word~1234";


    console.log("DoctorPatient: "+JSON.stringify(UserDetails))

    let prescriptInfo = {
      "patient_id":UserDetails.patientDigiAddress,
      "prescription_did":"pres_12345",
      "access_did":"access_12345",
      "consent":"Y",
      "diagnosis_info":UserDetails.diagnosis,
      "prescription_info":UserDetails.prescription
    }

        const res = await fetch("/api3/patient/prescription",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                "Authorization": "Basic "+base64_encode(`${userName}:${userPassword}`)
            },
            body:  JSON.stringify(
              prescriptInfo
            )
            
        })
        const data = await res.json();
        // alert("data "+JSON.stringify(data.message))

        if(data.message === "Transaction has been submitted"){
          // alert('Prescription, Diagnosis Info Provided Successfully')
          setMsg('Prescription, Diagnosis Info Provided Successfully')
          // history.push("/patientDetails");

        }
        else{
          setMsg('error occured')
        }
        
        
  }

  UserDetails.patientDigiAddress    =   userInfo.patient_id;
  UserDetails.doctorDigiAddress    =   decodeTokenInfo.digitalAddress;

//   alert("INFO: "+JSON.stringify(UserDetails))

  let PageInfo;
 
  if(userInfo){

    PageInfo = 
                
      <div className='row'>
        <h3 style={{color:"green"}}>{msg}</h3>
      <div className='col-md-6'>

                  <h3 className='text-left'>Patient Diagnsis & Prescription</h3>
                <form method="POST" onSubmit={(e)=>DoctorPatient(e)} >
                <div className="col-md-12">
                    <label>First Name:   </label>
                    <input type="text" className="form-control" id="firstname" placeholder="Enter First Name" name="firstname" autoComplete="off" value={userInfo.first_name} readOnly required />
                </div>
                <div className="col-md-12">
                    <label>Last Name:   </label>                    
                    <input type="text" className="form-control" id="lastname" placeholder="Enter First Name" name="firstname" autoComplete="off" value={userInfo.last_name} readOnly required />
                </div> 
                
                 {/* <div className="col-md-12">
                    <label>D.O.B:   </label>
                    <input type="text" className="form-control" id="lastname" placeholder="Enter First Name" name="firstname" autoComplete="off" value={userInfo.date_of_birth} readOnly required />
                </div>  */}

                <div className="col-md-12">
                    <label>Diagnosis Info:   </label>
                    <textarea type="text" className="form-control" id="patinetMedDet" onChange={RegisterInput} placeholder="Enter Diagnosis Information" name="diagnosis" autoComplete="off" required></textarea>
                </div>

                <div className="col-md-12">
                    <label>Prescription Info:   </label>
                    <textarea type="text" className="form-control" id="patinetMedDet" onChange={RegisterInput} placeholder="Enter Prescription Information" name="prescription" autoComplete="off" required></textarea>
                </div>
                <br /><br />

                <div className='col-md-12 text center'>
                    <button className='btn btn-primary' >Submit</button>
                </div>
                </form>
            </div>
            
<div className='col-md-1'></div>
<div className='col-md-5'>

{userInfo.status === 1 ?

<>
<h4 style={{padding:"10px 10px"}}>Patient Medical History {userInfo.UserDetails.digitalAddress} :</h4>
            
        <div className="row mt-3" style={{border:"1px solid gray",overflowY: "scroll",height:"auto",width:"100%",borderRadius:"5px"}}>
        
        <div className='row'>
        <div className='col-md-6'>
        
            

                <p><b>Medical Details : </b></p>
                </div>
                <div className='col-md-6'>
                <p><b>Date : </b></p>
                </div>
                </div>
                <div className='row'>
                {userInfo.patient_current_medical_details.map(MedicalDetail => ( 
                
                    <>
                    <div className='col-md-6'>
                    <p>{MedicalDetail.diagnosis}</p>
                
                </div>
                {/* <div className='col-md-6'>
                {new Date(MedicalDetail.createdDateTime).getDate()}-{new Date(MedicalDetail.createdDateTime).toLocaleString('default', { month: 'short' })}-{new Date(MedicalDetail.createdDateTime).getFullYear()}&nbsp;&nbsp;&nbsp;{new Date(MedicalDetail.createdDateTime).getHours()}:{new Date(MedicalDetail.createdDateTime).getMinutes()}:{new Date(MedicalDetail.createdDateTime).getSeconds()}
                </div> */}
                </>
                
             
                ))}
                </div>
            
    </div>
    </>
    :
    null
    }
</div>
            </div>

            
    
    

  } else {

    PageInfo = <h3> Patient Data Found</h3>
//     <form method="post" >
//         <h1 className="text-center">Patient Registration</h1>
//     <div className="row mt-3">
//         <div className="col-md-4"></div>
//         <div className="col-md-4">
//             <label>First Name:</label>
//             <input type="text" className="form-control" id="firstname" onChange={RegisterInput} placeholder="Enter First Name" name="firstname" autoComplete="off" required />
//         </div>
//     </div>
//     <div className="row mt-3">
//         <div className="col-md-4"></div>
//         <div className="col-md-4">
//             <label>Last Name:</label>
//             <input type="text" className="form-control" id="lastname" onChange={RegisterInput} placeholder="Enter Last Name" name="lastname" autoComplete="off" required />
//         </div>
//     </div>
//     <div className="row mt-3">
//         <div className="col-md-4"></div>
//         <div className="col-md-4">
//             <label>Date Of Birth:</label>
//             <input type="date" className="form-control" id="dob" onChange={RegisterInput} placeholder="Enter Date Of Birth" name="dob" autoComplete="off" required />
//         </div>
//     </div>
//     <div className="row mt-3">
//         <div className="col-md-4"></div>
//         <div className="col-md-4">
//             <label>Gender:</label>
//             &nbsp;&nbsp;&nbsp;&nbsp;
//             <input type="radio" id="male" name="gender" value="male" onChange={RegisterInput}/>&nbsp;&nbsp;Male
//             &nbsp;&nbsp;&nbsp;&nbsp;
//             <input type="radio" id="female" name="gender" value="female" onChange={RegisterInput} />&nbsp;&nbsp;Female
//         </div>
//     </div>
//     <div className="row mt-3">
//         <div className="col-md-4"></div>
//         <div className="col-md-4">
//             <label>Weight:</label>
//             <input type="number" className="form-control" id="weight" onChange={RegisterInput} placeholder="Enter Weight" name="weight" autoComplete="off" required />
//         </div>
//     </div>
//     <div className="row mt-3">
//         <div className="col-md-4"></div>
//         <div className="col-md-4">
//             <label>Address:</label>
//             <input type="text" className="form-control" id="address" onChange={RegisterInput} placeholder="Enter Address" name="address" autoComplete="off" required />
//         </div>
//     </div>
//     <div className="row mt-3">
//         <div className="col-md-4"></div>
//         <div className="col-md-4">
//             <label>Contact:</label>
//             <input type="number" className="form-control" id="contact" onChange={RegisterInput} placeholder="Enter Contact" name="contact" autoComplete="off" required />
//         </div>
//     </div>
//     <div className="row mt-3">
//         <div className="col-md-4"></div>
//         <div className="col-md-4">
//             <label>Patient Medical Details:</label>
//             <textarea type="text" className="form-control" id="patinetMedDet" onChange={RegisterInput} placeholder="Enter Patient Medical Details" name="patinetMedDet" autoComplete="off" required>
//             </textarea>
//         </div>
//     </div>
//     <div className="row mt-3">
//         <div className="col-md-4"></div>
//         <div className="col-md-4">
//             <button type="submit" onClick={Register} className="btn btn-primary">Next</button>
//         </div>
//     </div>
// </form>

  }
  
  return (
      
    <div className='container' style={{paddingTop:"6%"}}>
        {PageInfo}
        
        
        
      </div>
     );
}

export default PatientDoctorPrescription;
