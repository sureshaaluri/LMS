
export const generateOTP =async(email,digitalAddress,role)=>{ 
    console.log("email "+JSON.stringify(email));
    console.log("role "+JSON.stringify(role));
    console.log("digitalAddress "+JSON.stringify(digitalAddress));
const response = await fetch("/api4/sendOTP",{
                    method:"POST",
                    headers:{
                        "Content-Type" : "application/json"
                    },
                    body:  JSON.stringify({
                        email,digitalAddress,role
                    })
                })
                return response;
            }