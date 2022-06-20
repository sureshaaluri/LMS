import React from 'react';   // useState is used for state management
import { useHistory } from 'react-router-dom';

// using functional components, creating insurance form using react hooks
function PrescriptionManagement() {
   const history = useHistory();
  return (
      
    <div className='container' style={{paddingTop:"8%"}}>
    <div className='row'>
        <div className='col-md-2'></div>
        <div className='col-md-4 text-center'>
        <button  className='btn btn-primary' onClick={()=>history.push('/prescriptionUpload')}>Have a Prescription ?</button>
        </div>
        <div className='col-md-4 text-center'>
        <button  className='btn btn-primary'>Need Prescription ?</button>
        </div>
    </div>
        
        
      </div>
     );
}

export default PrescriptionManagement;
