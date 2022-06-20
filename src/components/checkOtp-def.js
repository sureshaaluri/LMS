import React,{useState} from 'react';   // useState is used for state management
import {useHistory, useLocation} from 'react-router-dom';
import { userInfoContext } from "./userContext";

// using functional components, creating patient details form using react hooks
function CheckOtp() {
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
      let details = getOTP.UserDetails
    //   alert("PatientDigiAddress "+JSON.stringify(getOTP))
      let {setuserToken, userToken}     =   React.useContext(userInfoContext); // access the values from parent component to use them in child component, using userInfoContext and useContext "React Hooks".
      let memberToken = {"token":userToken}
    
      const SubmitOtp = async (e)=>{
        e.preventDefault();
        if(UserDetails.otp == getOTP.otp){
            const res = await fetch("/api4/validUser",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:  JSON.stringify({
                details,memberToken
            })
                
            })
            const data = await res.json();
        // alert("data "+JSON.stringify(data))
            if(res.status === 200 && location.state.exists === 1){
                console.log(location.state.exists);
                // if(location.state.exists === 1){
                    history.push({pathname:'/patientEnrollment',state:{userData:data}});
                // }
                // else{
                    // history.push({pathname:'/patientEnrollment',state:{userData:data}});
                    // history.push({pathname:'/doctorDetails',state:{patientInfo:data}});
                // }
                // setData(data.info);
                // history.push({pathname:'/patientEnrollment',state:{userData:data}});
                // history.push({pathname:'/patientEnrollment',state:{userData:data}});
                // alert("have Prescription Details")
            }
            else if(res.status === 202 || (res.status === 200 && location.state.exists === 0)){
                // else {
                    history.push({pathname:'/doctorDetails',state:{patientInfo:details}})
                // history.push({pathname:'/doctorsList',state:{PatientDigiAddress:PatientDigiAddress}});
                
                // alert("No Prescription Details")
            }
            
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

export default CheckOtp;
