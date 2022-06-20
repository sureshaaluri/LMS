import React from 'react';   // useState is used for state management
import UserRegistration from './userRegister'
import Insurance from './insurance'
import {useHistory, useLocation} from 'react-router-dom';
import DoctorRegister from './doctorRegister';

 const PatientMangement = () => {

    var location        =   useLocation();
    
    return (
      <>
      
      <ul className="nav nav-tabs" id="myTab">
        <li className="nav-item">
            <a href="#registration" className="nav-link active" data-bs-toggle="tab">Patient Registration</a>
        </li>
        <li className="nav-item">
            <a href="#insurance" className="nav-link" data-bs-toggle="tab">Insurance</a>
        </li>
        <li className="nav-item">
            <a href="#docReg" className="nav-link" data-bs-toggle="tab">Doctor Registration</a>
        </li>
    </ul>
    {console.log(location.state.userData)}
    <div className="tab-content">
        <div className="tab-pane fade show active" id="registration">
            <UserRegistration patientData={location.state.userData} />
        </div>
        <div className="tab-pane fade" id="insurance">
            <Insurance />
        </div>
        <div className="tab-pane fade" id="docReg">
            <DoctorRegister />
        </div>
    </div>
    </>
    )
  // }
}
export default PatientMangement;