
import React, { useState } from 'react';   // useState is used for state management
import {useHistory, useLocation} from 'react-router-dom';
import { userInfoContext } from "./userContext";
import { generateOTP } from './generateOTP';
import jwt_decode from "jwt-decode";
import {getPatientDetails} from "./getPatientDetails";
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import { PatientVerification } from './patientVerification';
import { userName, userPassword } from './config';
// using functional components, creating patient details form using react hooks
function VerifyPatientDetails() {
    
    const history                       =   useHistory(); 
    
    // Declaring a new state variables 
   
    const [details, setDetails]         =   useState({});
    const [msg, setMsg]                 =   useState('')
    let {setuserToken, userToken}       =   React.useContext(userInfoContext); // access the values from parent component to use them in child component, using userInfoContext and useContext "React Hooks".
      // let memberToken = {"token":userToken}
    //   console.log("memberToken "+JSON.stringify(memberToken))
      var location        =   useLocation();

      React.useEffect( () => {
           
        if(location.state){

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
      },[])
      
      


    
    
    // console.log("token: "+JSON.stringify(userToken));

//     React.useEffect(() => {
//         if(location.state){
//             const decodedToken = jwt_decode(location.state.token);
//             setuserToken(decodedToken);
//     }
// }, [userToken])
  details.role = "Patient";
//   details.token = userToken;

  // updating state variable details
    function DetailsInput(event)      {
          let name = event.target.name;
          let value = event.target.value;


          setDetails({
            ...details,
            [name] : value
        })
      }

  // using fetch checking whether user registered or not
      const Details = async (e)=>{

        // let userName        =   "admin";
        // let userPassword    =   "pass@word~1234";

        // console.log(details.digitalAddress)
        
        e.preventDefault();
        const apitoken = "Bearer "+ userToken

        // await getPatientDetails(details,apitoken).then(async(res,err)=>{
        //   // console.log("getResult "+JSON.stringify(res));
        //   if(res){

        //     var myHeaders = new Headers();
        //     myHeaders.append("Authorization", apitoken.toString());
        //     myHeaders.append("apikey", "DNNU3KH4XMA25NZD49YM4VXCH9Q67M6M");
        //     myHeaders.append("Content-Type", "application/json");

        //     var raw = JSON.stringify([
        //       {
        //         "entityDigitalAddress": details.digitalAddress,
        //         "credentialTypes": [
        //           {
        //             "credentialType": "Health",
        //             "validFrom": "2021-01-01T00:00:00Z",
        //             "validTo": "2021-12-31T23:59:59Z"
        //           },
        //           {
        //             "credentialType": "Identity",
        //             "validFrom": "2021-01-01T00:00:00Z",
        //             "validTo": "2021-12-31T23:59:59Z"
        //           }
        //         ]
        //       }
        //     ]);

        //     var requestOptions = {
        //       method: 'POST',
        //       headers: myHeaders,
        //       body: raw,
        //       redirect: 'manual'
        //     };

        //     await fetch("/api2/api/v1/dap/consents", requestOptions).then( async(res, err) => {
        //       if (err) {
        //         console.log("err" + err);
        //       } else {
        //         const conset= await res.json();
        //         console.log("res" + JSON.stringify(conset));

        //       }
        //     })
        //     res.patientKey=0;
        //     if(res.credentialSchemaName==="Patient Identity")
        //     {
        //     history.push({ pathname: '/doctorDetails', state: { patientInfo: res } });
        //     }else{
        //       alert("No Patient Exists")
        //     }
            
          
        //   }else{
        //     alert("patient not exists")
        //   }
    
        //  })
        

        const res = await PatientVerification(details,userName,userPassword)
        const patdata = await res.json();
       
        let email;
        if(patdata.message.docType === "patient")
        {
          console.log("patient data: "+JSON.stringify(patdata))  

          let role = "patient";

          // alert("details "+ JSON.stringify(details))

          if(patdata.message.email === undefined){
            const credentialsData = await fetch("http://localhost:4000/credentialsCheck",{
              method:"POST",
              headers:{
                  "Content-Type" : "application/json"
              },
              body:  JSON.stringify({
                  details
              })
                  
              })
              const credentialsDataRes = await credentialsData.json();
              // alert("data "+JSON.stringify(credentialsDataRes))
            if(credentialsData.status === 201){
              email = credentialsDataRes.credentialID;
            }
              

          }else{
            email = patdata.message.email;
          }
          
          let digitalAddress = patdata.message.patient_id
          console.log("email " + JSON.stringify(email));
          console.log("digitalAddress " + JSON.stringify(digitalAddress));
          console.log("role " + JSON.stringify(role));
          const getOtpRes = await generateOTP(email, digitalAddress, role)
          const data = await getOtpRes.json();
          
          console.log("data " + JSON.stringify(data));
          if (data.status === 1) {
            history.push({ pathname: "/provideOtp", state: { sendPatientData: patdata,otp:data.otp,exists: 0 } })
          }

          // history.push({ pathname: '/doctorDetails', state: { patientInfo: data } });
        }else{
          setMsg("Patient Doesnot Exists");
        }

            
        
      //   let patientConsent = {"patient_id":details.digitalAddress,
      //   "access_did":"access_12345",
      //   "consent":"Y"}

      //   // console.log(patientConsent)
        
      //   if(data.message.patient_id){
          

      //    const consentRes= await fetch("http://13.67.200.85:3000/patient/consent",{
      //       method:"POST",
      //       headers:{
      //           "Content-Type" : "application/json",
      //           "Authorization": "Basic "+base64_encode(`${userName}:${userPassword}`)                
      //       },
      //       body:  JSON.stringify(
      //           patientConsent
      //       )  
      //   })

      //  let dataConsent=  await consentRes.json();
      //  console.log('test: '+JSON.stringify(dataConsent.message))
      //  if(dataConsent.message==="Transaction has been submitted"){
      //   //  alert('test')
      //    history.push({pathname:'/doctorDetails',state:{patientInfo:data.message}})
      //  }

        // .then(async (res,err) => {

        //   if(err){
        //     console.log(err)
        //   }
        //   else{
        //     console.log(JSON.stringify(res))
        //     // history.push({pathname:'/doctorDetails',state:{patientInfo:data.message}})
        //   }
        // })
        // }
        // else{
        //   alert("error existed")

        // }
        // alert(JSON.stringify("userData: "+data))

        // const decodeTokenInfo = jwt_decode(userToken);
        

        // if(decodeTokenInfo.role === 'Admin'){
        //   if(data.status === 1){
        //     history.push({pathname:'/checkOtp', state:{sendPatientData:data, exists:1}});
        //   }else{
        //       setMsg(`Patient not found with this address ${details.digitalAddress}`)
        //   }
        // }
        // else if(decodeTokenInfo.role === 'Doctor'){
        //     if(data.status === 1){
        //             history.push({pathname:'/patientDoctorPrescription', state:{userData:data}});
        //     }
        //     else{
        //         setMsg(`Patient not found with this address ${details.digitalAddress}`)
        //     }
            
        // }
        
        
        
    }
  return (
      
    <div className='container' style={{paddingTop:"8%"}}>

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

export default VerifyPatientDetails;
