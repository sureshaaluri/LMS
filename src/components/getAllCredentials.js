import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';
import { userInfoContext } from "./userContext";
import { useLocation} from 'react-router-dom';
var axios = require('axios');

function GetAllCredentials() {
  const history = useHistory();
  var location        =   useLocation();
  const [msg,setMessage] = useState("");
  const [UserDetails, setUserDetails] = useState({})
  let {setuserToken, userToken}     =   React.useContext(userInfoContext);
  let name,value;
  function DID(event){
          name = event.target.name;
          value = event.target.value;
          setUserDetails({
            ...UserDetails,
            [name] : value
        })
      }

  const SignUp = async (e)=>{
    e.preventDefault();
    const apitoken = "Bearer "+ userToken

    var myHeaders = new Headers();
myHeaders.append("Authorization",  apitoken.toString());
myHeaders.append("apikey", "HEKA5PJTHKKHYM4V595B5RUXL56VLDFB");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};


fetch(`/api1/api/v1/credential/credentials?entityDigitalAddress=${UserDetails.digitalAddress}`, requestOptions)
  .then(response => response.text())
  .then(result => alert(result))
  .catch(error => console.log('error', error));
    
  }
  
  return (
    <div className='container' style={{paddingTop:"8%"}}>
        <h1 className='text-center'>Get Credentials Info</h1>
        <h5 className='text-center' style={{'color':'red'}}>{msg}</h5>
        <form method="post" >
            <div className="row mt-2">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <label>Digital Address:</label>
                    <input type="text" className="form-control" onChange={DID} id="digitalAddress" placeholder="Enter Digital Address" name="digitalAddress" autoComplete="off" />
                </div>
            </div>
            
            <div className="row mt-3">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <button type="submit" onClick={SignUp} className="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
      </div>
     );
}

export default GetAllCredentials;
