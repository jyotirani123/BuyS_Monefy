import React, {useState} from 'react';
import './SignUp.css';
import options from '../../Constants';
import axios from 'axios';

function SignUp() {

  const [user, setUser] = useState({
    fname : "",
    lname : "",
    phn : "",
    email : "",
    username : "",
    password : "",
    cpassword : "",
    userType : ""
  });

  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name] : value});
  }
  const submitDetails = () => {
    axios.post("http://localhost:3001/api/signup", 
    {
      fname : user.fname , 
      lname : user.lname,
      phn : user.phn,
      email : user.email,
      username : user.username,
      password : user.password,
      cpassword : user.cpassword,
      userType : user.userType
    },).then(() => {
      console.log("post body");
    }).catch((err) => { console.log('Axios Error:', err); })
  };

    return (
        <div className="container">
          <form className="row justify-content-center" method="post">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="row mt-5">
                <div className="col text-center">
                  <h1 className="heading">Sign Up</h1>
                  <p className="text-h3">Please fill in this form to create an account.</p>
                </div>
              </div>
              <div className="row align-items-center inputBox">
                <div className="col mt-3 form-floating">
                  <input type="text" className="form-control" id="f-name" name="fname" value={user.fname} onChange={handleInput} placeholder="Enter your first name" required />
                  <label className="mx-3" htmlFor="fname">First Name</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col form-floating mt-1">
                  <input type="text" className="form-control" id="l-name" name="lname" value={user.lname} onChange={handleInput} placeholder="Enter your last name" required/>
                  <label className="mx-3" htmlFor="lname">Last Name</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 form-floating">
                  <input type="text" className="form-control" id="phn-no" name="phn" value={user.phn} onChange={handleInput} placeholder="+91 XXXXX XXXXX" required />
                  <label className="mx-3" htmlFor="phn">Phone Number</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 form-floating">
                  <input type="email" className="form-control" id="email-id" name="email" value={user.email} onChange={handleInput} placeholder="Enter your Email-id" required />
                  <label className="mx-3" htmlFor="email">Email Id</label>
                </div>
              </div>
              <div className="row align-items-center mt-4 inputBox">
                <div className="col mt-1 form-floating">
                  <input type="text" className="form-control" id="uname" name="username" value={user.username} onChange={handleInput} placeholder="Enter your username" required />
                  <label className="mx-3" htmlFor="username">Username</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 form-floating">
                  <input type="password" className="form-control" name="password" value={user.password} onChange={handleInput} id="pass" placeholder="password" required />
                  <label className="mx-3" htmlFor="password">Password</label>
                </div>
                <div className="col mt-1 form-floating">
                  <input type="password" className="form-control" id="cpass"  name="cpassword" value={user.cpassword} onChange={handleInput} placeholder="password" required />
                  <label className="mx-3" htmlFor="cpassword">Confirm Password</label>
                </div>
              </div>
              <div className="row justify-content-center mt-4 inputBox">
                <select className="mt-2 form-select" id="ddlUserType" name="userType" value={user.userType} onChange={handleInput} required >
                  <option value="0">select...</option>
                    {options.map((option, index) => (
                    <option key={index} value={option.typeId}>{option.userType}</option>
                  ))}
                </select>
              </div>
              <div className="row justify-content-start mt-3">
                <div className="col">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" required />
                      I Read and Accept <a href="/">Terms and Conditions</a>
                    </label>
                  </div>
                  <button className="btn btn-primary mt-3" onClick={submitDetails}>Sign Up</button>
                </div>
              </div>
          </div>
        </form>
      </div>
    );

}

export default SignUp;