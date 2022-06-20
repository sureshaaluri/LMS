

import { URL } from './config';

var Credentials = {}

 const credentialsCall = async (resp, getcredentialid, UserDetails) => {
  
    // alert("getcredentialid " + getcredentialid)
    UserDetails.role = "Patient";
    let country = "usa";
    Credentials.entityDigitalAddress = resp.entityDigitalAddress;
    Credentials.schemaName = "dtx-Patient";
    Credentials.credential_preview_ID = getcredentialid;
    Credentials.attributes = [
      {
        "name": "issuerId",
        "value": resp.issuerId
      },
      {
        "name": "issued",
        "value": resp.createdDate
      },
      {
        "name": "firstname",
        "value": resp.firstName
      },
      {
        "name": "lastname",
        "value": resp.lastName
      },
      {
        "name": "dateOfBirth",
        "value": resp.dateOfBirth
      },
      {
        "name": "gender",
        "value": UserDetails.gender
      },
      {
        "name": "weight",
        "value": UserDetails.weight
      },
      {
        "name": "address",
        "value": UserDetails.address
      },
      {
        "name": "contact",
        "value": UserDetails.contact
      },
      {
        "name": "digitalAddress",
        "value": resp.entityDigitalAddress
      },
      {
        "name": "companyName",
        "value": UserDetails.companyName
      },
      {
        "name": "policyNumber",
        "value": UserDetails.policyNumber
      },
      {
        "name": "did",
        "value": resp.entityId
      },
      {
        "name": "email",
        "value": UserDetails.email
      },
      {
        "name": "yearOfBirth",
        "value": new Date(UserDetails.dob).getFullYear()
      },
      // {
      //     "name" : "virus",
      //     "value" : ""
      // },
      // {
      //     "name" : "checkTime",
      //     "value" : ""
      // },
      // {
      //     "name" : "checkLocation",
      //     "value" : ""
      // },
      // {
      //     "name" : "checkedBy",
      //     "value" : ""
      // },
      // {
      //     "name" : "checkFacility",
      //     "value" : ""
      // },
      // {
      //     "name" : "diagnosisMethods",
      //     "value" : ""
      // },
    ]

    Credentials.entityId = resp.entityId;

    // const decodedToken = jwt_decode(userToken);

    UserDetails.did = Credentials.entityId;

    console.log("Credentials: "+JSON.stringify(Credentials));

     //insert user verifiable credentials to MongoDB
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

  

  export default credentialsCall;