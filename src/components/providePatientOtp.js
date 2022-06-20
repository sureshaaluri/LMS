import React,{useState} from 'react';   // useState is used for state management
import {useHistory, useLocation} from 'react-router-dom';
import { userInfoContext } from "./userContext";

// using functional components, creating patient details form using react hooks
function ProvidePatientOtp() {
    const location        =   useLocation();
    const history         =   useHistory();

    const [Data, setData]         =   useState({})
    const [UserDetails, setUserDetails] = useState({})
    const [Message, setMessage] = useState()

    let getOTP = location.state.sendPatientData

    // alert("getOTP "+JSON.stringify(getOTP))

    let name,value;
  function OtpInput(event)      {
          name = event.target.name;
          value = event.target.value;
          setUserDetails({
            ...UserDetails,
            [name] : value
        })
      }

      let PatientDigiAddress = getOTP.UserDetails.digitalAddress
    //   alert("PatientDigiAddress "+JSON.stringify(getOTP))
    //   let {setuserToken, userToken}     =   React.useContext(userInfoContext); // access the values from parent component to use them in child component, using userInfoContext and useContext "React Hooks".
    //   let memberToken = {"token":userToken}
    
      const SubmitOtp = async (e)=>{
        e.preventDefault();

        if(UserDetails.otp == getOTP.otp){

            history.push({pathname:'/doctorDetails',state:{PatientDigiAddress:PatientDigiAddress}});

            

        //     const res = await fetch("/api4/getPrescriptionDetails",{
        //     method:"POST",
        //     headers:{
        //         "Content-Type" : "application/json"
        //     },
        //     body:  JSON.stringify({
        //         PatientDigiAddress,memberToken
    
        //     })
                
        //     })
        //     const data = await res.json();
        // alert("data "+JSON.stringify(data))
        //     if(res.status === 200){
        //         setData(data.info);
        //         history.push({pathname:'/patientPrescriptionDetails', state:{patientPrescription:data,PatientDigiAddress:PatientDigiAddress}});
        //         // alert("have Prescription Details")
        //     }
        //     else if(res.status === 202){
        //         history.push({pathname:'/doctorsList',state:{PatientDigiAddress:PatientDigiAddress}});
        //         // alert("No Prescription Details")
        //     }
            
        }else{
            setMessage("OTP not matched")
        }
      }

  return (
      
    <div className='container' style={{paddingTop:"8%"}}>
        <div className='text-center'>
            <h1>Customer Consent</h1>
            <p>Please provide the OTP sent to your e-mail {getOTP.UserDetails.email}</p>
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

export default ProvidePatientOtp;
