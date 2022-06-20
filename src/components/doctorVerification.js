import {decode as base64_decode, encode as base64_encode} from 'base-64';

export const DoctorVerification=async(details,userName,userPassword)=>{ 
    const res = await fetch("/api3/doctor/"+details.digitalAddress,{
            method:"GET",
            headers:{
                "Content-Type" : "application/json",
                "Authorization": "Basic "+base64_encode(`${userName}:${userPassword}`)
                // "Authorization":`Bearer ${location.state.token}`
            },
            // body:  JSON.stringify({
            //     details,memberToken
            // })
            
        })
        return res;
    }