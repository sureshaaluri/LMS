//backup
import React, { useState } from 'react';   
import {useHistory} from 'react-router-dom';

function Registration() {
  const history = useHistory();
  const [UserDetails, setUserDetails] = useState({
    firstname : "",
    lastname : "",
    dob : "",
    cor : ""
  })

  let name,value;
  function RegisterInput(event){
          name = event.target.name;
          value = event.target.value;
          setUserDetails({
            ...UserDetails,
            [name] : value
        })
      }
      
  const Register = async (e)=>{
    e.preventDefault();
        // const {firstname,lastname,dob,cor} = UserDetails;
        
        const res = await fetch("/api4/register",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:  JSON.stringify({
                UserDetails
            })
        })
        const data = await res.json();
        if(res.status === 422 || !data )
        {
            window.alert("Fill all the fields");
        }else{
            window.alert("Registered Successfully");
            history.push("/");
        }
  }
  
  return (
    <div className='container' style={{paddingTop:"6%"}}>
        <form method="post" >
            <div className="row mt-3">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <label>First Name:</label>
                    <input type="text" className="form-control" id="firstname" onChange={RegisterInput} placeholder="Enter First Name" name="firstname" autoComplete="off" />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <label>Last Name:</label>
                    <input type="text" className="form-control" id="lastname" onChange={RegisterInput} placeholder="Enter Last Name" name="lastname" autoComplete="off" />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <label>Date Of Birth:</label>
                    <input type="date" className="form-control" id="dob" onChange={RegisterInput} placeholder="Enter Date Of Birth" name="dob" autoComplete="off" />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <label>Country Of Residence:</label>
                    <input type="text" className="form-control" id="cor" onChange={RegisterInput} placeholder="Enter Country Of Residence" name="cor" autoComplete="off" />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <button type="submit" onClick={Register} className="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
      </div>
     );
}

export default Registration;
