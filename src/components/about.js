import React, { useState } from 'react';
import {useHistory, useLocation} from 'react-router-dom';


function About() {
  let location = useLocation()

  React.useEffect(async ()=>{
    const res = await fetch("/api4/about",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json",
                // "Authorization":`Bearer ${location.state.token}`
            },
            body:  JSON.stringify({
                // details
            })
            
        })
        let data = res.json();
        alert(JSON.stringify(data))
  })
 

  return (
    <div className='container' style={{paddingTop:"8%"}}>
        hello
      </div>
     );
}

export default About;
