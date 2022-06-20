import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { useLocation} from 'react-router-dom';
import { userInfoContext } from "./userContext";

var axios = require('axios');

function SignUpComp() {
  const history = useHistory();
  var location        =   useLocation();
  const [msg,setMessage] = useState("");
  const [UserDetails, setUserDetails] = useState({
    firstName : "",
    lastName : "",
    dateOfBirth : "",
    countryOfResidence : ""
    
  })

  let name,value;
  function SignUPInput(event)      {
          name = event.target.name;
          value = event.target.value;
          setUserDetails({
            ...UserDetails,
            [name] : value
        })
      }

  const SignUp = async (e)=>{
    e.preventDefault();
    let {setuserToken, userToken}     =   React.useContext(userInfoContext);
    const apitoken = "Bearer "+ userToken

    console.log(apitoken.toString())
   
    
    var data = JSON.stringify({
      "dateOfBirth": "1980-01-15T00:00:00Z",
      "firstName": "krishna",
      "lastName": "prasad",
      "countryOfResidence": "USA"
    });
    
    var config = {
      method: 'POST',
      url: '/api1/api/v1/issuer/digital-address',
      headers: { 
        'Access-Control-Allow-Origin' : '*',
        'apikey': 'HEKA5PJTHKKHYM4V595B5RUXL56VLDFB', 
        'Authorization': apitoken.toString(),

        'Content-Type': 'application/json',
        "mode": 'no-cors'
      },
      data : data
    };
    
    await axios(config)
    .then(async (response) => {
      console.log(JSON.stringify(await response.data));
    })
    .catch(async function (error) {
      console.log(error);
    });
    
    //get details
  }
  
  return (
    <div className='container' style={{paddingTop:"8%"}}>
        <h1 className='text-center'>Register</h1>
        <h5 className='text-center' style={{'color':'red'}}>{msg}</h5>
        <form method="post" >
            <div className="row mt-2">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <label>First Name:</label>
                    <input type="text" className="form-control" onChange={SignUPInput} id="firstName" placeholder="Enter First Name" name="firstName" autoComplete="off" />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <label>Last Name:</label>
                    <input type="text" className="form-control" onChange={SignUPInput} id="lastName" placeholder="Enter Last Name" name="lastName" autoComplete="off" />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <label>Country of Residence:</label>
                    <input type="text" className="form-control" onChange={SignUPInput} id="cor" placeholder="Enter Country of Residence" name="cor" autoComplete="off" />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <label>Date Of Birth:</label>
                    <input type="date" className="form-control" onChange={SignUPInput} id="dob" placeholder="Enter Date Of Birth" name="dob" autoComplete="off" />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <button type="submit" onClick={SignUp} className="btn btn-primary">Sign Up</button>
                </div>
            </div>
        </form>
      </div>
     );
}

export default SignUpComp;
