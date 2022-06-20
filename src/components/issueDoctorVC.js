export const VC = async(UserDetails,resp,apitoken)=>{

  console.log("UserDetails "+ JSON.stringify(UserDetails));
  console.log("resp "+ JSON.stringify(resp));
  console.log("apitoken "+ apitoken);
 

var raw =  JSON.stringify({
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
    "value": new Date(UserDetails.dob).getFullYear()
    // "value": ""
  },
  {
    "name": "email",
    "value": UserDetails.email
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
  headers: {
    "Content-Type" : "application/json",
    "apikey" : "HEKA5PJTHKKHYM4V595B5RUXL56VLDFB",
    "Authorization": apitoken.toString(),
  },
  body: raw,
  redirect: 'follow'

  };

  await fetch("/api1/api/v1/credential/credentials/issue/_direct", requestOptions)
  .then(response => response.json())
  .then(async (result) => { 
    
    console.log("result Info "+ JSON.stringify(result))
    // setCredentials=result.data.credential_preview.id
    // Credentials.attributes[2].value=setCredentials;
  })
  .catch(error => console.log('error', error));
}