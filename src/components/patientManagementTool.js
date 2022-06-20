import React from 'react';   // useState is used for state management
import { useHistory, useLocation } from 'react-router-dom';

// using functional components, creating insurance form using react hooks
function PatientManagementTool() {
   const history = useHistory();
   const location = useLocation();
  return (
      
    <div className='container' style={{paddingTop:"8%"}}>
    <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-4 text-center'>
        <button  className='btn btn-primary' onClick={()=>history.push('/patientDetailsPrescription')}>Have a DID ?</button>
        </div>
        <div className='col-md-4 text-center'>
        <button  className='btn btn-primary' onClick={()=>history.push({pathname:'/PatientEnrollPrescription', state:{userData:""}})}>Need DID ?</button>


        </div>
    </div>
    <p></p>
    <h3 className="text-center">{location.state ? "patient condition is normal and medince supply required" : ""}</h3>
        
        
      </div>
     );
}

export default PatientManagementTool;
