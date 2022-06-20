import React from 'react';  // useState is used for state management
import { userInfoContext } from "./userContext";
import { useLocation} from 'react-router-dom';

function Dashboard() {

    let {setuserToken, userToken}       =   React.useContext(userInfoContext); // access the values from parent component to use them in child component, using userInfoContext and useContext "React Hooks".
    var location        =   useLocation();

    React.useEffect( () => {
           
        if(location.state){

                setuserToken(location.state.token)
                // const getToken = location.state.token
                // console.log(getToken)    
        }
      },[])
   
  return (
    <div className='container' style={{paddingTop:"8%"}}>
        <h1 className='text-center'>Welcome to Coordinate Care Dashboard</h1>
      </div>
     );
}

export default Dashboard;
