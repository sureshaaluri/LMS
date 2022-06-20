
import React, { useState } from 'react'; // useState is used for state management
import {useHistory, useLocation} from 'react-router-dom';
import { userInfoContext } from "./userContext";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
// import jwt_decode from "jwt-decode";
import {getPatientDetails} from "./getPatientDetails";
import { DoctorVerification } from './doctorVerification';
import { userName, userPassword } from './config';

// using functional components, creating to verify doctor digital address using react hooks
function DoctorDetails() {
    const history = useHistory();
    
    // Declaring a new state variable
    const [details, setDetails]         =   useState({})
    const [msg, setMsg]                 =   useState('')
      let {setuserToken, userToken}     =   React.useContext(userInfoContext); // access the values from parent component to use them in child component, using userInfoContext and useContext "React Hooks".
      
      // let memberToken = {"token":userToken}
      
      var location        =   useLocation();

// console.log("patientInfo"+location.state.patientInfo)

    //   React.useEffect( () => {
           
    //     if(location.state){
    //             const decodedToken = jwt_decode(location.state.token);
    //             setuserToken(decodedToken);
    //     }
    //   },[])
    
    // console.log("token: "+JSON.stringify(userToken));


  // updating state variable setDetails
    
  function DetailsInput(event)      {
          let name = event.target.name;
          let value = event.target.value;
          setDetails({
            ...details,
            [name] : value
        })
      }

      details.role = "Doctor";

      // using fetch checking whether doctor registered or not
    const Details = async (e)=>{

      // let userName        =   "admin";
      // let userPassword    =   "pass@word~1234";
        
        e.preventDefault();

        // const res = await fetch("http://13.67.200.85:3000/doctor/"+details.digitalAddress,{
        //     method:"GET",
        //     headers:{
        //         "Content-Type" : "application/json",
        //         "Authorization": "Basic "+base64_encode(`${userName}:${userPassword}`)
        //         // "Authorization":`Bearer ${location.state.token}`
        //     },
        //     // body:  JSON.stringify({
        //     //     details,memberToken
        //     // })
            
        // })
        // const data = await res.json();
        // // console.log(JSON.stringify(data))

        // if(data.message.doctor_id){
        //   // sending the variable to "/doctorDigitalInfo" 

        //   console.log('patient info: '+JSON.stringify(location.state.patientInfo))
        //   console.log("doctor info : "+JSON.stringify(data))
        //   history.push({pathname:'/doctorDigitalInfo', state:{userData:data,patientData:location.state.patientInfo}});
        // }
        // else{
        //   alert("error existed")
        // }
        const apitoken = "Bearer "+userToken

        
        const res = await DoctorVerification(details,userName,userPassword)
        const data = await res.json();
        console.log("patient data: "+JSON.stringify(data))  

        if(data.message.docType === "doctor")
        {
          history.push({pathname:'/doctorDigitalInfo', state:{userData:data,patientData:location.state.patientInfo}});
        }else{
          setMsg("Doctor Not Exists");
        }

        // await getPatientDetails(details,apitoken).then(async(res,err)=>{
        //   // console.log("getResult "+JSON.stringify(res));
        //   if(res.credentialSchemaName==="HIDA"){
        //     history.push({pathname:'/doctorDigitalInfo', state:{userData:res,patientData:location.state.patientInfo}});
        //   }else{
        //     alert("doctor not exists")
        //   }
    
        //  })
        
        
    }

//     let doctorInfo = location.state.patientInfo
//   console.log('patient info: '+JSON.stringify(location.state.patientInfo))

  return (
      
    <div className='container' style={{paddingTop:"8%"}}>
        <h3 className='text-center'>{msg}</h3>
         <form action="/" method="POST">
            <div className="row mt-2">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                <label>Doctor Digital Address</label>
                    <input type="text" className="form-control" id="patientAddress" onChange={DetailsInput} placeholder="Enter Doctor Digital Address" name="digitalAddress" autoComplete="off" />
                </div>
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

export default DoctorDetails;
