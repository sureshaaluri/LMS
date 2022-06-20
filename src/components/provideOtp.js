import React,{useState} from 'react';   // useState is used for state management
import {useHistory, useLocation} from 'react-router-dom';
import { userInfoContext } from "./userContext";

// using functional components, creating patient details form using react hooks
function ProvideOtp() {
    const location        =   useLocation();
    const history         =   useHistory();

    const [Data, setData]         =   useState({})
    const [UserDetails, setUserDetails] = useState({})
    const [Message, setMessage] = useState()

    let sendPatientData = location.state.sendPatientData
    let otp = location.state.otp
    let exists = location.state.exists

    // alert("getOTP "+JSON.stringify(getOTP))
    console.log("sendPatientData: "+JSON.stringify(sendPatientData))

    let name,value;
  function OtpInput(event)      {
          name = event.target.name;
          value = event.target.value;
          setUserDetails({
            ...UserDetails,
            [name] : value
        })
      }

      const SubmitOtp = async (e)=>{
        e.preventDefault();
        if(otp == UserDetails.otp && exists == 0){
            history.push({ pathname: '/doctorDetails', state: { patientInfo: sendPatientData } });
        }else if(otp == UserDetails.otp && exists == 1){
            history.push({ pathname: '/patientPrescriptionDetails', state: { patientPrescription: sendPatientData.message.prescription, PatientDigiAddress: sendPatientData.message } })
        }else{
            setMessage("Enter Valid OTP")
        }
      }

  return (
      
    <div className='container' style={{paddingTop:"8%"}}>
        <div className='text-center'>
            <h1>Customer Consent</h1>
            <p style={{color:'green'}}>Please provide the OTP sent to your e-mail {sendPatientData.message.email}</p>
        </div>
        
        <div className='text-center'><h2>{Message}</h2></div>
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

export default ProvideOtp;
