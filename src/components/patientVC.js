import credentialsCall from "./patientcredentialsCall";

 const VC = async (UserDetails, resp, apitoken) => {

    // console.log("UserDetails " + JSON.stringify(UserDetails));
    var myHeaders = new Headers();
    myHeaders.append("Authorization", apitoken.toString());
    myHeaders.append("apikey", "HEKA5PJTHKKHYM4V595B5RUXL56VLDFB");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "entityDigitalAddress": UserDetails.digitalAddress,
      "entityId": resp.entityId,
      "schemaName": "Patient Identity",
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
          "name": "height",
          "value": "175"
        },
        {
          "name": "heightUnit",
          "value": "cm"
        },
        {
          "name": "weight",
          "value": UserDetails.weight
        },
        {
          "name": "weightUnit",
          "value": "lb"
        },
        {
          "name": "gender",
          "value": UserDetails.gender
        },
        {
          "name": "primaryLanguage",
          "value": "lb"
        },
        {
          "name": "emergencyContactName",
          "value": "Ketty Commins"
        },
        {
          "name": "emergencyContactNumber",
          "value": "241-321-3707"
        },
        {
          "name": "email",
          "value": UserDetails.email
        },
        {
          "name": "emailType",
          "value": "Work"
        },
        {
          "name": "phoneNumber",
          "value": UserDetails.contact
        },
        {
          "name": "bloodType",
          "value": "B-"
        }
      ]
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    console.log(JSON.stringify(requestOptions))
    await fetch("/api1/api/v1/credential/credentials/issue/_direct", requestOptions)
      .then(response => response.json())
      .then(async (result) => {
        console.log("api credentials " + JSON.stringify(result))
        let getcredentialid = result.data.id
        await credentialsCall(resp, getcredentialid, UserDetails);
      })
      .catch(error => console.log('error', error));
  }

  export default VC;