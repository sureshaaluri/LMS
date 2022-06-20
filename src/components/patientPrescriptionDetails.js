import React,{useState,useEffect} from 'react';   // useState is used for state management
import {useHistory, useLocation} from 'react-router-dom';
import { userInfoContext } from "./userContext";
import sha256 from 'crypto-js/sha256';
import jwt_decode from "jwt-decode";
import { URL } from './config';
// import {VC} from "./issueDoctorVC";
import {decode as base64_decode, encode as base64_encode} from 'base-64';

// using functional components, creating patient details form using react hooks
function PatientPrescriptionDetails() {
    const location        =   useLocation();
    const history         =   useHistory();
    const [Data, setData]         =   useState([])
    const [Credentials, setCredentials] = useState({})
    const [prescriptions, setprescriptions] = useState([])
    let {setuserToken, userToken}       =   React.useContext(userInfoContext);
      // let memberToken = {"token":userToken}
      
      let getPatientDetails = location.state.patientPrescription
      let useDigAddr        =   location.state.PatientDigiAddress
    console.log("useDigAddr "+JSON.stringify(useDigAddr))
      const apitoken = "Bearer "+userToken
      
useEffect(() => {
    
    setData(getPatientDetails);
    
},[]) 

const [resp, setresp] = useState({
    entityId : useDigAddr.entityId,
    firstName : useDigAddr.first_name,
    lastName : useDigAddr.last_name,
    dateOfBirth : useDigAddr.date_of_birth,
    countryOfResidence : useDigAddr.country_of_residence
})

// console.log(JSON.stringify(Data))




    
async function credentialsCall(){

    // validPrescriptionUser
    // const digitalAddress = location.state.PatientDigiAddress;
    // alert("digitalAddress "+JSON.stringify(digitalAddress))
    
    // let userName        =   "admin";
    // let userPassword    =   "pass@word~1234";

    // const res = await fetch("http://13.67.200.85:3000/patient/"+digitalAddress,{
    //     method:"GET",
    //     headers:{
    //         "Content-Type" : "application/json",
    //         "Authorization": "Basic "+base64_encode(`${userName}:${userPassword}`)
    //     },
    //     // body:  JSON.stringify({
    //     //     digitalAddress,memberToken

    //     // })
        
    // })
    // const data = await res.json();
    // console.log("data "+JSON.stringify(data))

// for (var i = 0; i < Data.length; i++) {
//     alert("for loop")
//     prescriptions.push({
//         "prescription" :Data[i].prescription,
//         "diagnosis" :Data[i].diagnosis
//     })
//     // alert("pres "+JSON.stringify(pres))
//     // setprescriptions(...prescriptions,pres)
//     }
// alert("Data "+JSON.stringify(Data) )
// setprescriptions(Data)

    console.log("prescriptions "+JSON.stringify(prescriptions))
    

    Credentials.digitalAddress = useDigAddr.patient_id;
    Credentials.entityDigitalAddress = useDigAddr.patient_id;

  Credentials.schemaName = "dtx-Prescription";
  Credentials.attributes = [
      {
        "name" : "issuerId",
        },
        {
            "name" : "issued",
            "value" : new Date()
        },
        {
            "name" : "Prescription",
            // "value": prescriptions
            "value": Data
        },
    ]

    Credentials.entityId = useDigAddr.entityId
  const decodedToken = jwt_decode(userToken);
    Credentials.attributes[0].value = "did:dtx:"+sha256(decodedToken.email,Credentials.entityDigitalAddress).toString();
    Credentials.email = useDigAddr.email;
    Credentials.dob = "";
    Credentials.contact = useDigAddr.contact_number;

alert("Credentials "+JSON.stringify(Credentials))

}

    // console.log("prescription: "+JSON.stringify(Data))

    // alert("Data "+JSON.stringify(Data))


    const VC=async(UserDetails,resp,apitoken)=>{

        console.log("VC "+ JSON.stringify(UserDetails))
        console.log("VC "+ JSON.stringify(resp))
        console.log("VC "+ apitoken)
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", apitoken);
    myHeaders.append("apikey", "HEKA5PJTHKKHYM4V595B5RUXL56VLDFB");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "entityDigitalAddress": UserDetails.digitalAddress,
      "entityId": resp.entityId,
      "schemaName": "HIDA",
      "attributes": [
        {
          "name": "firstName",
          "value": resp.firstName
        },
        {
          "name": "lastName",
          "value": resp.lastName
        },
        {
          "name": "dateOfBirth",
          "value": resp.dateOfBirth
        },
        
        {
          "name": "yearOfBirth",
            "value": ""
        },
        {
          "name": "email",
          // "value": UserDetails.email
          "value": ""
          
        },
        {
          "name": "countryCode",
          "value": "1"
        },
        {
          "name": "phoneNumber",
          "value":UserDetails.contact
        },
        {
          "name": "countryOfResidence",
          "value": resp.countryOfResidence
        },
        {
          "name": "sourceType",
          "value": "I"
        },
        {
          "name": "identifier",
          "value": "241-321-3707"
        },
        {
          "name": "businessName",
          "value": "r"
        },
        {
          "name": "countryOfIncorporation",
          "value": "United States"
        },
        {
          "name": "dateOfIncorporation",
          "value": "2001-07-08 07:18:51 -0400"
        }
      ]
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
      
    };
    
    fetch("/api1/api/v1/credential/credentials/issue/_direct", requestOptions)
      .then(response => response.json())
      .then((result) => { 
        
        console.log("result "+ JSON.stringify(result))
        // setCredentials=result.data.credential_preview.id
        // Credentials.attributes[2].value=setCredentials;
      })
      .catch(error => console.log('error', error));
    }

    async function next(){
        await credentialsCall()
         await fetch(`${URL}/userCredentials`,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:  JSON.stringify({
                Credentials
            })

        })
        Credentials.dateKey = 0;
        await VC(Credentials,resp,apitoken);
        
        history.push({pathname:'patientManagementTool',state:{status:1}})

    }

  return (
      
    <div className='container' style={{paddingTop:"8%"}}>
        <div className='text-center'>
            <h1>Patient Prescription Details </h1>
            <br /><table className='table table-bordered'>
                <tr>
                    <th className='p-2'>Diagnosis Info</th>
                    <th className='p-2'>Prescription Info</th>
                    <th className='p-2'>Date</th>
                </tr>
                {Data.map(item => (
                    <tr>
                    <td className='p-2'>{item.diagnosis_info}</td>
                    <td className='p-2'>{item.prescription_info}</td>
                    <td className='p-2'>{item.prescription_date}</td>
                    {/* <td className='p-2'>
                    {new Date(item.allotedDateTime).getDate()}-{new Date(item.allotedDateTime).toLocaleString('default', { month: 'short' })}-{new Date(item.allotedDateTime).getFullYear()}&nbsp;&nbsp;&nbsp;{new Date(item.allotedDateTime).getHours()}:{new Date(item.allotedDateTime).getMinutes()}:{new Date(item.allotedDateTime).getSeconds()}
                    </td> */}
                </tr>

                ))}
                
            </table>
            {Data.length === 0 ? 
                null
                :
                <button className='btn btn-primary' onClick={next}>Next</button>
                }
           
        </div>
      
    </div>
     );
}

export default PatientPrescriptionDetails;
