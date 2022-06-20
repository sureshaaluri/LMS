import React, { useState } from 'react';  // useState is used for state management
import { useHistory } from 'react-router-dom';
import { userInfoContext } from "./userContext";

import { decode as base64_decode, encode as base64_encode } from 'base-64';
// import { MD5 } from 'crypto-js';
import { URL } from './config';
import { VC } from './issueDoctorVC';
import { credentialsCall } from './credentialsCall';
var axios = require('axios');

// using functional components, creating doctor registration form using react hooks
function DoctorRegister() {
    const history = useHistory();
    let country = 'usa'
    // Declaring a new state variables
    const [Message, setMessage] = useState("")
    const [ErrMsg, setErrMsg] = useState("")
    const [UserDetails, setDoctorDetails] = useState({})
    const [Credentials, setCredentials] = useState({})
    let {setuserToken, userToken}     =   React.useContext(userInfoContext);

    const apitoken = "Bearer " + userToken
    // updating state variable UserDetails
    let name, value, userDID;
    const RegisterInput = async (event) => {
        name = event.target.name;
        value = event.target.value;

        //   if(UserDetails.firstname && UserDetails.lastname){
        //     userDID =   UserDetails.firstname+'.'+UserDetails.lastname+'.usa@dtx';
        //     if(userDID){
        //         // alert(userDID)
        //         document.getElementById("did").value = userDID;
        //         // UserDetails.did = userDID
        //         // setUserDetails({...UserDetails,did:userDID})                
        //     }            
        // }

        await setDoctorDetails({
            ...UserDetails,
            [name]: value,
            // did:userDID
        })



    }

    if (UserDetails.firstname !== undefined && UserDetails.lastname !== undefined) {
        UserDetails.digitalAddress = UserDetails.firstname.toLowerCase() + '.' + UserDetails.lastname.toLowerCase() + '.usa@dtx';
    }




    //   setDoctorDetails({...UserDetails,did:userDID})
    //   console.log(JSON.stringify(UserDetails))

    // let { setuserToken, userToken } = React.useContext(userInfoContext);
    // let memberToken = { "token": userToken }


    //   console.log("Credentials "+ JSON.stringify(Credentials))

    const proc = async (e,resp) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", apitoken);
        myHeaders.append("apikey", "HEKA5PJTHKKHYM4V595B5RUXL56VLDFB");

        console.log("resp from TP API: " + JSON.stringify(resp))
        //to create and insert verifiable credentials using 3rd party API's
        UserDetails.dateKey = 1;
        
        //to create and insert verifiable credentials to MongoDB
        await credentialsCall(UserDetails, resp, Credentials);

        //to insert data to chaincode network
        let userName = "admin";
        let userPassword = "pass@word~1234";

        let DoctorInfo = {
            "doctor_id": resp.entityDigitalAddress,
            "first_name": resp.firstName,
            "last_name": resp.lastName,
            "date_of_birth": resp.dateOfBirth,
            "gender": UserDetails.gender,
            "address": UserDetails.address,
            "contact_number": UserDetails.contact,
            "license_id": "123456",
            "email": UserDetails.email
        }


        let doctorinfoDB = {
            "username": resp.firstName + resp.lastName,
            "password": UserDetails.password,
            "digitalAddress": UserDetails.digitalAddress,
            "role": UserDetails.role
        }

        console.log("Doc Info: " + JSON.stringify(DoctorInfo))


        await fetch("/api3/doctor", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + base64_encode(`${userName}:${userPassword}`)
                // "Authorization": "Basic YWRtaW46cGFzc0B3b3JkfjEyMzQ="
            },
            body: JSON.stringify(DoctorInfo)
        }).then(async (res, err) => {
            // console.log(res)
            if (err) {
                console.log(err)
            } else {
                const data = await res.json();
                console.log('data response: ' + JSON.stringify(data))

                console.log( "doctorinfo" + JSON.stringify(doctorinfoDB) )
                //insert user data in MongoDB
                await fetch(`${URL}/userRegister`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({doctorinfoDB})
                }).then(async (res) => {
                    // console.log(res)
                    const data = await res.json();
                    // alert(JSON.stringify(data))
                    if (data.status === 1) {
                        setMessage("Doctor Registered Successfully")
                    }
                    // alert('Doctor Registered Successfully')
                })


                // insert veriable credentials to MongoDB
                await fetch(`${URL}/userCredentials`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        Credentials
                    })
                })
            }


        })



    }
    //thirdparty api digital address creation
    const tpDigitalAddrCreate = async (e) => {

    //     var myHeaders = new Headers();
    // myHeaders.append("apikey", "HEKA5PJTHKKHYM4V595B5RUXL56VLDFB");
    // myHeaders.append("Authorization", apitoken.toString());
    // myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "dateOfBirth": UserDetails.dob,
      "firstName": UserDetails.firstname,
      "lastName": UserDetails.lastname,
      "countryOfResidence": UserDetails.cor
    });

    var requestOptions = {
      method: 'POST',
      headers: {
        "apikey": "HEKA5PJTHKKHYM4V595B5RUXL56VLDFB",
        "Authorization": apitoken.toString(),
        "Content-Type": "application/json"
      },
      body: raw,
      redirect: 'follow'
    };

    console.log( "result: "+JSON.stringify(requestOptions) )    

    await fetch("/api1/api/v1/issuer/digital-address", requestOptions)
      .then(response => response.json())
      .then(async (result) => {
        console.log( "result: "+JSON.stringify(result) )
        if(result.statusCode === 400){
          setErrMsg(result.errorMessage);
        }else{
            
          await proc(e, result);
          await VC(UserDetails, result, apitoken);

          return true;
        }
       })
      .catch(error => console.log('error', error));


        
     }

    // using fetch, registering doctor
    const Register = async (e) => {
        e.preventDefault();
        await tpDigitalAddrCreate();
        // await proc();




        // history.push("/patientDetails")
        // const data = await res.json();
        // // alert(JSON.stringify(data.status))
        // if(data.status===1){
        //     setMessage("Patient Insurance Approved")
        // }
        // alert('Doctor Registered Successfully')

    }

    return (
        <div className='container'>
            <h1 className="text-center">Doctor Registration</h1>
            {Message ?
            <h3 className='text-center'>{Message}</h3>
                : 
                <>
                <h3 className='text-center'>{ErrMsg}</h3>
            <form method="post">
                <div className="row mt-3">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <label>First Name:</label>
                        <input type="text" className="form-control" id="firstname" onChange={RegisterInput} placeholder="Enter First Name" name="firstname" autoComplete="off" required />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <label>Last Name:</label>
                        <input type="text" className="form-control" id="lastname" onChange={RegisterInput} placeholder="Enter Last Name" name="lastname" autoComplete="off" required />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <label>Contact:</label>
                        <input type="number" className="form-control" id="contact" onChange={RegisterInput} placeholder="Enter Contact" name="contact" autoComplete="off" required />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <label>Digital Address:</label>
                        <input type="text" className="form-control" id="digitalAddress" onChange={RegisterInput} name="digitalAddress" autoComplete="off" value={UserDetails.digitalAddress} required readOnly />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <label>Email:</label>
                        <input type="email" className="form-control" id="email" onChange={RegisterInput} placeholder="Enter Email" name="email" autoComplete="off" required />
                    </div>
                </div>
                {/* <div className="row mt-3">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <label>License Id:</label>
                    <input type="text" className="form-control" id="licenseId" onChange={RegisterInput} placeholder="Enter License Id" name="licenseId" autoComplete="off" required />
                </div>
            </div> */}
                <div className="row mt-3">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <label>Date Of Birth:</label>
                        <input type="date" className="form-control" id="dob" onChange={RegisterInput} placeholder="Enter Date Of Birth" name="dob" autoComplete="off" required />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                    <label>Country: </label>
                    <select className='form-control' onChange={RegisterInput} name="cor" required>
                        <option value="">Select Country</option>
                        <option value="usa" >USA</option>
                    </select>
                         
                        {/*<input type="text" className="form-control" id="cor" onChange={RegisterInput} placeholder="Enter Country" name="cor" autoComplete="off" required /> */}
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <label>Gender:</label>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="gender" value="Male" name="gender" onChange={RegisterInput} />&nbsp;&nbsp;Male
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="gender" value="Female" name="gender" onChange={RegisterInput} />&nbsp;&nbsp;Female
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <label>Weight: </label>
                        <input type="text" className="form-control" id="weight" onChange={RegisterInput} placeholder="Enter weight" name="weight" autoComplete="off" required />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <label>Address:</label>
                        <input type="text" className="form-control" id="address" onChange={RegisterInput} placeholder="Enter Address" name="address" autoComplete="off" required />
                    </div>
                </div>

                {/* <div className="row mt-3">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <label>DID:</label>
                        <input type="text" className="form-control" id="did" onChange={RegisterInput} placeholder="Enter DID" name="did" autoComplete="off" required />
                    </div>
                </div> */}

                <div className="row mt-3">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <button type="submit" onClick={Register} className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
            </>
            }
        </div>
    );
}

export default DoctorRegister;
