import React, { useState } from 'react';  // useState is used for state management
import {useHistory} from 'react-router-dom';
import { URL } from './config';
import jwt_decode from "jwt-decode";
// require("./setupProxy");
var axios = require('axios');
// using functional components, creating doctor login form using react hooks
function DoctorLogin() {
  const history = useHistory();

  // Declaring a new state variables
  const [msg,setMessage] = useState("");
  const [UserDetails, setUserDetails] = useState({
    username : "",
    password : ""
  })

// updating state variable UserDetails
  let name,value;
  function LoginInput(event)      {
          name = event.target.name;
          value = event.target.value;
          setUserDetails({
            ...UserDetails,
            [name] : value
        })
      }

      const tpDoctorLogin = async (resdata)=>{
        // alert(JSON.stringify(resdata.UserDetails.digitalAddress))
       var DA = JSON.stringify(resdata)
     
        // var data = JSON.stringify({
        //   "entityDigitalAddress": DA.UserDetails.digitalAddress
        // });
        
        var config = {
          method: 'post',
          url: '/api2/api/v1/dap/digital-address/authenticate',
          headers: { 
            'Content-Type': 'application/json', 
            'apikey': 'DNNU3KH4XMA25NZD49YM4VXCH9Q67M6M'
          },
          data : JSON.stringify({
            "entityDigitalAddress": resdata.UserDetails.digitalAddress
          })
        };
        // alert(JSON.stringify(resdata.UserDetails.digitalAddress))
        await axios(config)
          .then( response => {
            // alert("get response "+JSON.stringify(response.data.id_token));
            // localStorage.setItem("apitoken",response.data.id_token);
            // history.push({pathname:'/signUp', state:{apitoken:response.data.id_token}});
          })
          .catch(function (error) {
            alert(error);
          });
        // .then(async function (response) {
          
        //   // localStorage.setItem("apitoken",response.data.id_token);
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
      }
        
      //  await fetch("/api/v1/dap/digital-address/authenticate", requestOptions).then( (response) => {
      //   //  console.log("get decode token "+entityDigitalAddress);
      //     // alert("get decode token "+JSON.stringify(response.data));
      //     // localStorage.setItem("apitoken",response.data.id_token);
      //   })

      //   //   .then(response => response.text())
      //   //   .then(result => console.log(result))
      //     .catch(error => console.log('error', error));
      // }

      // using fetch, checking whether doctor registered or not
      const Login = async (e)=>{
      e.preventDefault();
      const {username,password} = UserDetails;
    
      const res = await fetch(`${URL}/doctorlogin`,{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:  JSON.stringify({
            username,password

        })
        
    })
    // alert("data "+JSON.stringify(res))
    const data = await res.json();
    
    if(data.status === 1){
        
        await tpDoctorLogin(data);

        // storing the items to local storage.
        // localStorage.setItem("userToken",JSON.stringify(data.token));
        // sending the variable to "/patientDetails" 
        history.push({pathname:'/dashboard', state:{token:data.token}});
    }
    else if(data.status === 0){
        setMessage(data.message)
    }

   
  }
  
  return (
    <div className='container' style={{paddingTop:"8%"}}>
        <h1 className='text-center'>Doctor Login</h1>
        <h5 className='text-center' style={{'color':'red'}}>{msg}</h5>
        <form method="post" >
            <div className="row mt-2">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <label>Username:</label>
                    <input type="text" className="form-control" onChange={LoginInput} id="username" placeholder="Enter Username" name="username" autoComplete="off" />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <label>Password:</label>
                    <input type="password" className="form-control" onChange={LoginInput} id="password" placeholder="Enter password" name="password" autoComplete="off" />
                </div>
            </div>
            {/* <div className="row mt-3">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="form-check">
                        <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" name="remember" /> Remember me
                        </label>
                    </div>
                </div>
            </div> */}
            <div className="row mt-3">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <button type="submit" onClick={Login} className="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
      </div>
     );
}

export default DoctorLogin;
