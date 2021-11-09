import React from 'react';
import './SignUp.css';
import options from '../../Constants';

function SignUp() {
    return (
        <div className="container">
          <form className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="row mt-5">
                <div className="col text-center">
                  <h1 className="heading">Sign Up</h1>
                  <p className="text-h3">Please fill in this form to create an account.</p>
                </div>
              </div>
              <div className="row align-items-center inputBox">
                <div className="col mt-3 form-floating">
                  <input type="email" className="form-control" id="f-name" placeholder="Enter your first name" />
                  <label className="mx-3" htmlFor="fname">First Name</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col form-floating mt-1">
                  <input type="text" className="form-control" id="l-name" placeholder="Enter your last name" />
                  <label className="mx-3" htmlFor="lname">Last Name</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 form-floating">
                  <input type="text" className="form-control" id="phn-no" placeholder="+91 XXXXX XXXXX" />
                  <label className="mx-3" htmlFor="phnNo">Phone Number</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 form-floating">
                  <input type="email" className="form-control" id="email-id" placeholder="Enter your Email-id" />
                  <label className="mx-3" htmlFor="email">Email Id</label>
                </div>
              </div>
              <div className="row align-items-center mt-4 inputBox">
                <div className="col mt-1 form-floating">
                  <input type="text" className="form-control" id="uname" placeholder="Enter your username" />
                  <label className="mx-3" htmlFor="uname">Username</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 form-floating">
                  <input type="password" className="form-control" id="pass" placeholder="password" />
                  <label className="mx-3" htmlFor="pass">Password</label>
                </div>
                <div className="col mt-1 form-floating">
                  <input type="password" className="form-control" id="cpass" placeholder="password" />
                  <label className="mx-3" htmlFor="cpass">Confirm Password</label>
                </div>
              </div>
              <div className="row justify-content-center mt-4 inputBox">
                <select className="mt-2 form-select" id="ddlUserType" name="userType">
                  <option value="0">select...</option>
                    {options.map((option) => (
                    <option value={option.typeId}>{option.userType}</option>
                  ))}
                </select>
              </div>
              <div class="row justify-content-start mt-3">
                <div class="col">
                  <div class="form-check">
                    <label class="form-check-label">
                      <input type="checkbox" class="form-check-input" />
                      I Read and Accept <a href="/">Terms and Conditions</a>
                    </label>
                  </div>
                  <button class="btn btn-primary mt-3">Sign Up</button>
                </div>
              </div>
          </div>
        </form>
      </div>
    );

}

export default SignUp;