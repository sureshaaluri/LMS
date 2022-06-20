import React from 'react';
import Login from './components/login'
import PrescriptionUpload from './components/prescriptionUpload'
import Authentication from './components/authentication';
import DoctorLogin from './components/doctorLogin'
import CheckOtp from './components/checkOtp'
import Dashboard from './components/dashboard'
import GetAllCredentials from "./components/getAllCredentials";
import PatientInsuranceRegister from './components/patientInsuranceRegister'
import VerifyPatientDetails from './components/verifyPatientDetails'
import PatientEnrollment from './components/patientEnrollment'
import PatientDetails from './components/patientDetails'
import PatientPrescriptionDetails from './components/patientPrescriptionDetails'
import SignUpComp from './components/signUp'
import RegisterPatient from './components/registerPatient'
import DoctorDetails from './components/doctorDetails'
import PatientDigitalAddress from './components/patientDigitalAddress'
import Registration from './components/registration'
import DoctorRegister from './components/doctorRegister'
import DoctorDigiInfo from './components/doctorDigitalInfo'
import PatientDoctorPrescription from "./components/patientDoctorPrescription";
import Insurance from './components/insurance'
import PatientEnrollInsurance from './components/patientEnrollInsurance'
import ProvideOtp from './components/provideOtp'
import DoctorsList from './components/doctorsList'
import PatientManagementTool from './components/patientManagementTool'
import Header from "./components/header";
import PrescriptionManagement from './components/prescriptionManagement'
import About from "./components/about";
import DigitalManagement from "./components/digitalManagement"
import PatientDetailsPrescription from "./components/patientDetailsPrescription"
import PatientEnrollPrescription from "./components/patientEnrollPrescription"
import UserRegistration from "./components/userRegister";
import PatientMangement from './components/patientMangement'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { userInfoContext } from "./components/userContext";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

function App() {

  const [userToken, setuserToken] =   React.useState(); // state should be updated from the child component (Patient Details) to parent component (App)
// alert("userToken "+userToken)

  return (
    <div className="App">
    <userInfoContext.Provider value={{userToken, setuserToken}}>
      <Router>
      <Header />
        <Switch>
          <Route exact path="/"><Login /></Route> 
          <Route exact path="/about"><About /></Route>
          <Route exact path="/registration"><Registration /></Route> 
          <Route exact path="/userRegistration"><UserRegistration /></Route> 
          <Route exact path="/dashboard"><Dashboard /></Route> 
          <Route exact path="/getAllCredentials"><GetAllCredentials /></Route> 
          <Route exact path="/checkOtp"><CheckOtp /></Route> 
          <Route exact path="/registerPatient"><RegisterPatient /></Route> 
          <Route exact path="/digitalManagement"><DigitalManagement /></Route> 
          <Route exact path="/patientInsuranceRegister"><PatientInsuranceRegister /></Route> 
          <Route exact path="/verifyPatientDetails"><VerifyPatientDetails /></Route> 
          <Route exact path="/patientEnrollment"><PatientEnrollment /></Route> 
          <Route exact path="/patientDigitalAddress"><PatientDigitalAddress /></Route> 
          <Route exact path="/patientDoctorPrescription"><PatientDoctorPrescription /></Route> 
          <Route exact path="/patientEnrollInsurance"><PatientEnrollInsurance /></Route> 
          <Route exact path="/prescriptionManagement"><PrescriptionManagement /></Route> 
          <Route exact path="/provideOtp"><ProvideOtp /></Route> 
          <Route exact path="/doctorsList"><DoctorsList /></Route> 
          <Route exact path="/patientPrescriptionDetails"><PatientPrescriptionDetails /></Route> 
          <Route exact path="/patientDetailsPrescription"><PatientDetailsPrescription /></Route> 
          <Route exact path="/patientManagementTool"><PatientManagementTool /></Route> 
          <Route exact path="/prescriptionUpload"><PrescriptionUpload /></Route> 
          <Route exact path="/patientDetails"><PatientDetails /></Route> 
          <Route exact path="/doctorDetails"><DoctorDetails /></Route> 
          <Route exact path="/auth"><Authentication /></Route>
          <Route exact path="/signUp"><SignUpComp /></Route>
          <Route exact path="/doctorRegister"><DoctorRegister /></Route> 
          <Route exact path="/patientEnrollPrescription"><PatientEnrollPrescription /></Route> 
          <Route exact path="/doctorDigitalInfo"><DoctorDigiInfo /></Route> 
          <Route exact path="/doctorLogin"><DoctorLogin /></Route> 
          <Route exact path="/insurance"><Insurance /></Route> 
          <Route exact path="/patientMangement"><PatientMangement /></Route> 
        </Switch>
      </Router>
      </userInfoContext.Provider>
      </div>
  );
}

export default App;
