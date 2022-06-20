import React, { useState } from 'react';  // useState is used for state management
import { useHistory } from 'react-router-dom';
import jwt_decode from "jwt-decode";

var axios = require('axios');

// using functional components, creating login form using react hooks
function Login() {
    const history = useHistory();

    // Declaring a new state variables
    const [msg, setMessage] = useState("");
    const [UserDetails, setUserDetails] = useState({
        username: "",
        password: "",
        rememberMe1 : false
    })

    // updating state variable UserDetails
    let name, value;
    function LoginInput(event) {
        name = event.target.name;
        value = event.target.value;

        setUserDetails({
            ...UserDetails,
            [name]: value
        })
    }


    function ClickRememberMe(){
        setUserDetails({
            ...UserDetails,
            rememberMe1 : true
        })
    }
    
//third party api login
    const tpLogin=async()=>{
        var data = JSON.stringify({
            "username": UserDetails.username,
            "password": UserDetails.password,
            "rememberMe": UserDetails.rememberMe1
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
        
          await axios(config)
          .then( response => {
              let decodedToken = jwt_decode(response.data.id_token);
            console.log("get decode token "+JSON.stringify(decodedToken));
            // localStorage.setItem("apitoken",response.data.id_token);
            history.push({ pathname: '/dashboard', state: {token: response.data.id_token }});
          })
          .catch(function (error) {
            alert(error);
          });
        
    }
    // using fetch, checking whether user registered or not
    const Login = async (e) => {
        e.preventDefault();
                await tpLogin();   
    }

    // Login form 
    return (
        <div className='container' style={{ paddingTop: "8%" }}>
            <h1 className='text-center'>Admin Login</h1>
            <h5 className='text-center' style={{ 'color': 'red' }}>{msg}</h5>
            <form method="post" className= "needs-validation" noValidate>
                <div className="row mt-2">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <label>Username:</label>
                        <input type="text" className="form-control" onChange={LoginInput} id="username" placeholder="Enter Username" name="username" autoComplete="off" required="required" />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <label>Password:</label>
                        <input type="password" className="form-control" onChange={LoginInput} id="password" placeholder="Enter password" name="password" autoComplete="off" required />
                    </div>
                </div>
                <div className="row mt-3">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="form-check">
                        <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" onClick={ClickRememberMe} name="remember" /> Remember me
                        </label>
                    </div>
                </div>
            </div>
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

export default Login;
