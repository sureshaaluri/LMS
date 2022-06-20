export const getPatientDetails=async(details,apitoken)=>{
  var myHeaders = new Headers();
myHeaders.append("Authorization",  apitoken.toString());
myHeaders.append("apikey", "HEKA5PJTHKKHYM4V595B5RUXL56VLDFB");

var requestOptions = {
method: 'GET',
headers: myHeaders,
redirect: 'follow'
};



const res= await fetch(`/api1/api/v1/credential/credentials?entityDigitalAddress=${details.digitalAddress}`, requestOptions)
.then(response => response.json())
.then(async(result) => {
      // console.log("result "+JSON.stringify(result))
      const resultLen = result.length;
    const xyz= await CheckById(result[resultLen-1].credentialId,apitoken,details);
  return xyz;
    })
.catch(error => console.log('error', error));


return res
  }


  

  const CheckById = async (credentialID,apitoken,details) => {
      // alert("credentialID " + credentialID)
      
      var myHeaders = new Headers();
      myHeaders.append("apikey", "HEKA5PJTHKKHYM4V595B5RUXL56VLDFB");
      myHeaders.append("Authorization", apitoken.toString());
      myHeaders.append("mode", "no-cors");
  
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
  
      // https://api-tenant.stage.digitaltrust.net/api/v1/credential/credentials/c6e61fb3-3dc5-4742-893c-ecfe7d250b44?entityDigitalAddress=hgh.ssc.usa@dtx
      // console.log(typeof(credentialID) , typeof(details.digitalAddress))
  
     const setResult = await fetch(`/api1/api/v1/credential/credentials/${credentialID}?entityDigitalAddress=${details.digitalAddress}`, requestOptions)
        .then(response => response.json())
        .then(async result => {
        await result
          // console.log("result "+JSON.stringify(result));
          return result;
          // history.push({ pathname: '/patientDoctorPrescription', state: { userData: result } });
        })
        .catch(error => console.log('error', error));
      //   console.log("setResult "+JSON.stringify(setResult))
        return setResult;
    }
