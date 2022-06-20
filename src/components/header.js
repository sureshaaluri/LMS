import React from 'react';    // useState is used for state management
import {useHistory} from 'react-router-dom';
import { userInfoContext } from "./userContext";
import jwt_decode from "jwt-decode";

// using functional components, creating header using react hooks
function Header() {
    let history = useHistory();
    let decodedToken;
    // Declaring a new state variable
    const [msg, setMsg] = React.useState('')
    let { userToken, setuserToken } = React.useContext(userInfoContext);
    console.log("userToken "+JSON.stringify(userToken))
    
    if(userToken){   // if userToken exists, using jwt_decode getting _id and role
        decodedToken = jwt_decode(userToken);
        console.log("userDecodedToken "+JSON.stringify(decodedToken))
    }else if(userToken === undefined || !userToken){
        // localStorage.removeItem('apitoken')
    }
    
   // getting the items from local storage. 
    
    React.useEffect( () => {

        // if userToken not exists redirecting to Login Form 
        if(!userToken){
            history.push('/')
            setMsg('Please Login')
        }
        else{
            // sending the variable to "/patientDetails" 
            history.push({pathname:'/patientDetails', state:{token:userToken}})
        }

    },[msg])
    

    //to decode the usertoken

    async function logout(){
         
        //remove item from local storage
        // localStorage.removeItem('userToken')
        // localStorage.removeItem('apitoken')
        window.location.href = "/";

       
    }
    
  return (
      
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
        <div className="container-fluid">
        {userToken ? 
            <a className="navbar-brand">
            <button className='btn btn-primary' onClick={()=>history.push({pathname:'/dashboard', state:{token:userToken}})}>COORDINATED CARE</button>
            </a>
            
            :
            <a className="navbar-brand" href="/dashboard">COORDINATED CARE</a>
            
            }
            <ul className="navbar-nav">
            {userToken ? 
            <>            
                { decodedToken.auth === "ROLE_ISSUER_ADMIN" ? 
                <>
                <li className="nav-item">
                <button className='btn btn-primary' onClick={()=>history.push({pathname:'/PatientDigitalAddress'})}>Patient Registration/Doctor Referral</button>
            </li>
                <li className="nav-item">                
                <button className='btn btn-primary' onClick={()=>history.push('/doctorRegister')}>Doctor Registration</button>
            </li> 
            <li className="nav-item">
                <button className='btn btn-primary' onClick={()=>history.push('/patientManagementTool')}>Prescription management tool</button>                
            </li>
            {/* <li className="nav-item">
                <button className='btn btn-primary' onClick={()=>history.push('/getAllCredentials')}>Get All Credentials</button>               
            </li>

            <li className="nav-item">
                <button className='btn btn-primary' onClick={()=>history.push('/signUp')}>SignUp</button>               
            </li> */}
            </>
            
            :
            
             <li className="nav-item">
                <button className='btn btn-primary' onClick={()=>history.push({pathname:'/PatientDetails'})}>Patient Prescription Management</button>
            </li>}
            
            <li className="nav-item">
                <button className='btn btn-primary' onClick={logout}>LOGOUT</button>                
            </li>
            </>
            :
            <>
            <li className="nav-item">
                <button className='btn btn-primary' onClick={()=>history.push('/')}>Admin Login</button>               
            </li>

            <li className="nav-item">
                <button className='btn btn-primary' onClick={()=>history.push('/doctorLogin')}>Doctor Login</button>               
            </li>
            </>
            }
            
            </ul>
        </div>
    </nav>

     );
}

export default Header;
