import React,{useState,useEffect} from 'react';   // useState is used for state management
import {useHistory, useLocation} from 'react-router-dom';
import { userInfoContext } from "./userContext";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { userName, userPassword } from './config';

// using functional components, creating patient details form using react hooks
function DoctorsList() {
    const location        =   useLocation();
    const history         =   useHistory();
    const [Data, setData]         =   useState([])
    
    const [PrescriptionReqInfo, setPatientDocDigiAddr]         =   useState({})
    // let {setuserToken, userToken}     =   React.useContext(userInfoContext); // access the values from parent component to use them in child component, using userInfoContext and useContext "React Hooks".
      
    // let memberToken = {"token":userToken}
    let patientDigiAddress = location.state.PatientDigiAddress

    // let userName        =   "admin";
    // let userPassword    =   "pass@word~1234";

     useEffect(async () => {
        await fetch("/api3/doctor",{
            method:"GET",
            headers:{
                "Content-Type" : "application/json",
                "Authorization": "Basic "+base64_encode(`${userName}:${userPassword}`)                
            }
            
        }).then(res => res.json()).then(jsonRes => setData(jsonRes))
    },[])

    console.log('doctors list: '+JSON.stringify(Data))

    

    const RequestPrescription = async(doctorDigiAddress,email)=>{
        

        PrescriptionReqInfo.patientDigiAddress  = patientDigiAddress;
        PrescriptionReqInfo.doctorDigiAddress  = doctorDigiAddress;
        PrescriptionReqInfo.requestedDateTime  = new Date();

        
        alert("PrescriptionReqInfo "+JSON.stringify(PrescriptionReqInfo))
        
    const res = await fetch("/api4/prescriptionrequest",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:  JSON.stringify({
            PrescriptionReqInfo,email
        })
        
    })

    
    const data = await res.json();
    // alert("data "+data)
    if(data.status === 1){
       alert("Your prescription request submitted successfully")
    //    history.push({pathname:'patientManagementTool',state:{status:1}})

    }
    else if(data.status === 0){
        
        alert("Your prescription request failed")
    }
    }

    // alert(JSON.stringify(Data))
    
  return (
      
    <div className='container' style={{paddingTop:"8%"}}>
        <div className='text-center'>
            <h1>Doctors List </h1>
            {/* {console.log(JSON.stringify(Data.message))} */}

            {Data.message ? 
            <table className='table-bordered'>
                <thead>
                <tr>
                    <th className='p-2'>Doctor Name</th>
                    <th className='p-2'>Digital Address</th>
                    <th className='p-2'>Prescription Request</th>
                </tr>
                </thead>
                <tbody>
                {Data.message.map(item => (

                    // console.log(JSON.stringify(item.Record.first_name))
                    
            <tr>
               <td className='p-2'>{item.Record.first_name}</td>
              <td className='p-2'>{item.Record.doctor_id}</td>
              <td className='p-2'><button className='btn btn-primary' onClick={()=>RequestPrescription(item.Record.doctor_id,item.Record.email)}>Request for prescription</button></td>
            </tr>
        ))}
        </tbody>
                
            </table> : ''}
            
           
        </div>
      
    </div>
     );
}

export default DoctorsList;
