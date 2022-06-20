import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import jwt_decode from "jwt-decode";
var axios = require('axios');

function Authentication() {
  const history = useHistory();
  const [msg,setMessage] = useState("");
  const [UserDetails, setUserDetails] = useState({
    username : "",
    password : "",
    rememberMe : true,
    
  })

  let name,value;
  function LoginInput(event)      {
          name = event.target.name;
          value = event.target.value;
          setUserDetails({
            ...UserDetails,
            [name] : value
        })
      }

  const Login = async (e)=>{
    e.preventDefault();
    var data = JSON.stringify({
        "username": "auyzbb1sg3jeipz5k6dv",
        "password": "s0sx2iux67",
        "rememberMe": true
      });
      
      var config = {
        method: 'POST',
        url: '/api1/api/v1/issuer/authenticate',
        headers: { 
          'Access-Control-Allow-Origin' : '*',
          'apikey': 'HEKA5PJTHKKHYM4V595B5RUXL56VLDFB', 
          'Content-Type': 'application/json',
          "mode": 'no-cors'
        },
        data : data
      };
      alert("config "+JSON.stringify(config))
      await axios(config)
      .then(function (response) {
          let decodedToken = jwt_decode(response.data.id_token);
        alert("get decode token "+JSON.stringify(decodedToken));
        // localStorage.setItem("apitoken",JSON.stringify(response.data.id_token));
        history.push({pathname:'/signUp', state:{apitoken:response.data.id_token}});
      })
      .catch(function (error) {
        alert(error);
      });
    
  }
  
  return (
    <div className='container' style={{paddingTop:"8%"}}>
        <h1 className='text-center'>Login</h1>
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

export default Authentication;
