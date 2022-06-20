import React from 'react';   // useState is used for state management
// import {useHistory,useLocation} from 'react-router-dom';
// import { userInfoContext } from "./userContext";

// using functional components, creating insurance form using react hooks
function DigitalManagement() {
   
    function InputValue(){
        
    }

    function SubmitValue(){

    }

  return (
      
    <div className='container' style={{paddingTop:"8%"}}>
        <h1 className='text-center'>Insurance Details</h1>
        <form method="post" >
            <div className="row mt-2">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <label>First Name:</label>
                    <input type="text" className="form-control" onChange={InputValue} id="firstname" placeholder="Enter First Name" name="firstname" autoComplete="off" required />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <label>Last Name:</label>
                    <input type="text" className="form-control" onChange={InputValue} id="lastname" placeholder="Enter Last Name" name="lastname" autoComplete="off" required />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <label>Date Of Birth:</label>
                    <input type="date" className="form-control" onChange={InputValue} id="dob" placeholder="Enter Date Of Birth" name="dob" autoComplete="off" required />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <label>Country Of Residence:</label>
                    <input type="text" className="form-control" onChange={InputValue} id="cor" placeholder="Enter Country Of Residence" name="cor" autoComplete="off" required />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <label>Identifier:</label>
                    <input type="text" className="form-control" onChange={InputValue} id="identifier" placeholder="Enter Identifier" name="identifier" autoComplete="off" required />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <label>Source:</label>
                    <input type="text" className="form-control" onChange={InputValue} id="source" placeholder="Enter Source" name="source" autoComplete="off" required />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <button type="submit" onClick={SubmitValue} className="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
      </div>
     );
}

export default DigitalManagement;
