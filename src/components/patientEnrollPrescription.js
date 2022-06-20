import React, { useEffect, useState } from 'react';   // useState is used for state management
import { useHistory, useLocation } from 'react-router-dom';
import { userInfoContext } from "./userContext";

// using functional components, creating User Registration form using react hooks
function PatientEnrollPrescription() {
    // console.log(JSON.stringify(props.patientData.UserDetails))
    // let { setuserToken, userToken } = React.useContext(userInfoContext); // access the values from parent component to use them in child component, using userInfoContext and useContext "React Hooks".

    // let memberToken = { "token": userToken }
    const location = useLocation();
    const history = useHistory();

    let PageInfo;
    let userInfo = location.state.userData

    //Declaring a new state variable
    const [patientHistory, setPatientMedicalHistory] = useState({})

    if (userInfo.status === 1) {
        patientHistory.patientDigiAddress = userInfo.UserDetails.digitalAddress;
    }

    //Declaring a new state variables
    const [UserDetails, setUserDetails] = useState({})
    const [MedicalDetails, setMedicalDetails] = useState([{}])

    useEffect(() => {
        // alert("hi")
        if (userInfo.status === 1) {

            const digiAddressPatient = userInfo.UserDetails.digitalAddress;
            // alert("digiAddressPatient" + JSON.stringify(digiAddressPatient))
            fetch("/api4/getPatientMedHistory", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    digiAddressPatient
                })
            })
                .then(res => res.json())
                .then(jsonRes => {
                    // alert(JSON.stringify(jsonRes))
                    setMedicalDetails(jsonRes)
                })
            // alert("MedicalDetails "+JSON.stringify(MedicalDetails))
        }
    }, [])



    // updating state variable UserDetails
    let name, value, userDID;
    function RegisterInput(event) {
        //   alert('hi')
        name = event.target.name;
        value = event.target.value;

        //   if(UserDetails.firstname && UserDetails.lastname && UserDetails.contact){
        //     // userDID =   UserDetails.firstname+UserDetails.contact+"@"+UserDetails.lastname;
        //     userDID =   UserDetails.firstname+'.'+UserDetails.lastname+'.usa@dtx';
        //     if(userDID){
        //         document.getElementById("did").value = userDID;
        //         // UserDetails.did = userDID
        //         // setUserDetails({...UserDetails,did:userDID})


        //     }

        // }

        setUserDetails({
            ...UserDetails,
            [name]: value,
            // did:userDID
        })



    }

    if (UserDetails.firstname != undefined && UserDetails.lastname != undefined) {
        UserDetails.digitalAddress = UserDetails.firstname.toLowerCase() + '.' + UserDetails.lastname.toLowerCase() + '.usa@dtx';
    }


    // using fetch, registering user
    const Register = async (e) => {

        // console.log("UserDetails "+JSON.stringify(UserDetails))
        e.preventDefault()
        history.push({
            pathname: '/patientEnrollInsurance',
            state: { getUserDetails: UserDetails }
        });

    }

    function RegisterPatMedHntist(event) {
        patientHistory.patientMedicalHistory = event.target.value
    }

    // using fetch, registering user details
    const RegisterMedHist = async (e) => {
        e.preventDefault();
        const response = await fetch("/api4/patientMedicalHistory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization":`Bearer ${location.state.token}`
            },
            body: JSON.stringify({
                patientHistory
            })
        })
        const dataMedicalHistory = await response.json();
        // alert("dataMedicalHistory "+JSON.stringify(dataMedicalHistory))
        // if(response.status = 422|| !dataMedicalHistory )
        // {
        //     window.alert("Fill all the fields");
        // }else
        if (dataMedicalHistory.status === 1) {
            // alert("Patient Medical details updated")        
            history.push({ pathname: "/doctorDetails", state: { patientInfo: userInfo.UserDetails } })
        } else {
            alert('Patient Medical details not updated')
        }
    }





    PageInfo =
        <div className='row'>
            <div className='col-md-6'>

                <form method="post"  onSubmit={userInfo.status === 1 ? RegisterMedHist : Register}>
                    <h1 className="text-center">{userInfo.status === 1 ? "Patient Details" : "Patient Registration"}</h1>
                    <div className="row mt-3">
                        <label>First Name:</label>
                        <input type="text" className="form-control" id="firstname" onChange={RegisterInput} placeholder="Enter First Name" name="firstname" autoComplete="off" defaultValue={userInfo.status === 1 ? userInfo.UserDetails.firstname : ''} readOnly={userInfo.status === 1 ? "readOnly" : ""} required />
                    </div>
                    <div className="row mt-3">
                        <label>Last Name:</label>
                        <input type="text" className="form-control" id="lastname" onChange={RegisterInput} placeholder="Enter Last Name" name="lastname" autoComplete="off" defaultValue={userInfo.status === 1 ? userInfo.UserDetails.lastname : ''} readOnly={userInfo.status === 1 ? "readOnly" : ""} required />
                    </div>
                    <div className="row mt-3">
                        <label>Date Of Birth:</label>
                        <input type="date" className="form-control" id="dob" onChange={RegisterInput} placeholder="Enter Date Of Birth" name="dob" autoComplete="off" defaultValue={userInfo.status === 1 ? userInfo.UserDetails.dob : ''} readOnly={userInfo.status === 1 ? "readOnly" : ""} required />
                    </div>
                    <div className="row mt-3">
                        <label>Email:</label>
                        <input type="email" className="form-control" id="email" onChange={RegisterInput} placeholder="Enter Email" name="email" autoComplete="off" defaultValue={userInfo.status === 1 ? userInfo.UserDetails.email : ''} readOnly={userInfo.status === 1 ? "readOnly" : ""} required />
                    </div>
                    <div className="row mt-3">
                        <label>Contact:</label>
                        <input type="number" className="form-control" id="contact" onChange={RegisterInput} placeholder="Enter Contact" name="contact" autoComplete="off" required defaultValue={userInfo.status === 1 ? userInfo.UserDetails.contact : ''} readOnly={userInfo.status === 1 ? "readOnly" : ""} />
                    </div>
                    <div className="row mt-3">
                    
                    <label>Country: </label>
                    <select className='form-control' onChange={RegisterInput} name="cor" >
                        <option value="">Select Country</option>
                        <option value="usa" >USA</option>
                    </select>
                    
                </div>
                    <div className="row mt-3">
                        <label>Digital Address:</label>
                        <input type="text" className="form-control" id="digitalAddress" onChange={RegisterInput} name="digitalAddress" autoComplete="off" required defaultValue={userInfo.status === 1 ? userInfo.UserDetails.digitalAddress : UserDetails.digitalAddress} readOnly />
                    </div>
                    <div className="row mt-3">
                        <label>Gender:</label>

                        <div className="row mt-3">
                            <div className='col-md-6'>
                                <input type="radio" id="male" name="gender" defaultValue="male" checked={userInfo.status === 1 && userInfo.UserDetails.gender === "male" ? "selected" : null} readOnly={userInfo.status === 1 ? "readOnly" : ""} onChange={RegisterInput} />&nbsp;&nbsp;male
                            </div>
                            <div className='col-md-6'>
                                <input type="radio" id="female" name="gender" defaultValue="female" onChange={RegisterInput} checked={userInfo.status === 1 && userInfo.UserDetails.gender === "female" ? "selected" : null} readOnly={userInfo.status === 1 ? "readOnly" : ""} />&nbsp;&nbsp;Female
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <label>Weight:</label>
                        <input type="number" className="form-control" id="weight" onChange={RegisterInput} placeholder="Enter Weight" name="weight" autoComplete="off" required defaultValue={userInfo.status === 1 ? userInfo.UserDetails.weight : ''} readOnly={userInfo.status === 1 ? "readOnly" : ""} />

                    </div>
                    <div className="row mt-3">
                        <label>Address:</label>
                        <input type="text" className="form-control" id="address" onChange={RegisterInput} placeholder="Enter Address" name="address" autoComplete="off" required defaultValue={userInfo.status === 1 ? userInfo.UserDetails.address : ''} readOnly={userInfo.status === 1 ? "readOnly" : ""} />

                    </div>


                    {/* <div className="row mt-3">
                        <label>Patient DID:</label>
                        <input type="text" className="form-control" id="did" onChange={RegisterInput} placeholder="Enter Patient DID" name="did" autoComplete="off" defaultValue={userInfo.status === 1 ? userInfo.UserDetails.did : ''} readOnly={userInfo.status === 1 ? "readOnly" : ""} required />
                    </div> */}

                    <div className="row mt-3">
                        <label>Patient Medical Details:</label>
                        <textarea type="text" className="form-control" id="patinetMedDet" onChange={userInfo.status === 1 ? RegisterPatMedHntist : RegisterInput} defaultValue="" placeholder="Enter Patient Medical Details" name="patinetMedDet" autoComplete="off" required >

                        </textarea>

                    </div>
                    <div className="row mt-3">
                        <button type="submit" className="btn btn-primary">Next</button>

                    </div>
                </form>

            </div>

            <div className='col-md-1'></div>
            <div className='col-md-5'>

                {userInfo.status === 1 ?

                    <>
                        <h4 style={{ padding: "10px 10px" }}>Patient Medical History {userInfo.UserDetails.digitalAddress} :</h4>

                        <div className="row mt-3" style={{ border: "1px solid gray", overflowY: "scroll", height: "auto", width: "100%", borderRadius: "5px" }}>

                            <div className='row'>
                                <div className='col-md-6'>



                                    <p><b>Medical Details : </b></p>
                                </div>
                                <div className='col-md-6'>
                                    <p><b>Date : </b></p>
                                </div>
                            </div>
                            <div className='row'>
                                {MedicalDetails.map(MedicalDetail => (

                                    <>
                                        <div className='col-md-6'>
                                            <p>{MedicalDetail.patientMedicalHistory}</p>

                                        </div>
                                        <div className='col-md-6'>
                                            {new Date(MedicalDetail.createdDateTime).getDate()}-{new Date(MedicalDetail.createdDateTime).toLocaleString('default', { month: 'short' })}-{new Date(MedicalDetail.createdDateTime).getFullYear()}&nbsp;&nbsp;&nbsp;{new Date(MedicalDetail.createdDateTime).getHours()}:{new Date(MedicalDetail.createdDateTime).getMinutes()}:{new Date(MedicalDetail.createdDateTime).getSeconds()}
                                        </div>
                                    </>


                                ))}
                            </div>

                        </div>
                    </>
                    :
                    null
                }
            </div>
        </div>

    //   }

    return (

        <div className='container' style={{ paddingTop: "6%" }}>
            {PageInfo}



        </div>
    );
}

export default PatientEnrollPrescription;
