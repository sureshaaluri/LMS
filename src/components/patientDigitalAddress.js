import React from 'react';   // useState is used for state management
import { useHistory } from 'react-router-dom';

// using functional components, creating insurance form using react hooks
function PatientDigitalAddress() {
   const history = useHistory();
  return (
      
    <div className='container' style={{paddingTop:"8%"}}>
    <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-4 text-center'>
        <button  className='btn btn-primary' onClick={()=>history.push('/verifyPatientDetails')}>Have a DID ?</button>
        </div>
        <div className='col-md-4 text-center'>
        <button  className='btn btn-primary' onClick={()=>history.push({pathname:'/patientEnrollment', state:{userData:""}})}>Need DID ?</button>
        </div>
    </div>
        
        
      </div>
     );
}

export default PatientDigitalAddress;
