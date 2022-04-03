import React ,{useState}from 'react';
// import './RegisterBank.css';
import axios from 'axios';

 import { useNavigate } from "react-router-dom";

function RegisterBank() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
        bankname : "",
        bankid: "",
        ifsc : "",
        address : "",
        branchcode : "",
        interest:"",
        password:"",
        usertype:4,


  });

  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name] : value});
  }
 

const  submitDetails = (e) => {
  e.preventDefault();
  console.log(user.bankname,user.bankid,user.ifsc,user.address,user.branchcode,user.interest,user.password);
axios.post("http://localhost:3001/api/registerbank", 
    {
          bankname : user.bankname,
          bankid: user.bankid,
          ifsc : user.ifsc,
          address :user.address,
          branchcode : user.branchcode,
          interest:user.interest,
          password:user.password,
          usertype:4,
 
    },).then((res) => {
      
    console.log(res);
    console.log("post body");
    navigate("/");
   
  }).catch((err) => { 
      
      console.log('Axios Error:', err);
    
    })
  console.log("yo");

  };
    return (
      <>
      <div className="container">
      <form className="row justify-content-center" method="post">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="row">
            <div className="col text-center">
              <h1 className="heading">Register Bank</h1>
              <p className="text-h3">Please fill in this form to Register Bank.</p>
            </div>
          </div>
          <div className="row align-items-center inputBox">
            <div className="col mt-3 form-floating">
              <input type="text" className="form-control" id="bankname" placeholder='Bank Name' name="bankname" value={user.bankname} onChange={handleInput} required />
              <label className="mx-3" htmlFor="bankname">Bank Name</label>
            </div>
          </div>
          <div className="row align-items-center inputBox mt-4">
            <div className="col form-floating mt-1">
              <input type="text" className="form-control" id="bankid" name="bankid" value={user.bankid} onChange={handleInput} placeholder="Bank ID" required/>
              <label className="mx-3" htmlFor="bankid">Bank ID</label>
            </div>
          </div>
          <div className="row align-items-center inputBox mt-4">
            <div className="col mt-1 form-floating">
              <input type="text" className="form-control" id="ifsc" name="ifsc" value={user.ifsc} onChange={handleInput} placeholder="IFSC code" required />
              <label className="mx-3" htmlFor="ifsc">IFSC code</label>
            </div>
          </div>
          <div className="row align-items-center inputBox mt-4">
            <div className="col mt-1 form-floating">
              <input type="text" className="form-control" id="address" name="address" value={user.address} onChange={handleInput} placeholder="Address" required />
              <label className="mx-3" htmlFor="address">Bank Address</label>
            </div>
          </div>
          <div className="row align-items-center inputBox">
            <div className="col mt-3 form-floating">
              <input type="text" className="form-control" id="city" name="city" value={user.city} onChange={handleInput} placeholder="Enter city" required />
              <label className="mx-3" htmlFor="city">City</label>
            </div>
          </div>
          <div className="row align-items-center inputBox">
            <div className="col mt-3 form-floating">
              <input type="text" className="form-control" id="state" name="state" value={user.state} onChange={handleInput} placeholder="Enter state" required />
              <label className="mx-3" htmlFor="state">State</label>
            </div>
          </div>
      
          <div className="row align-items-center inputBox">
            <div className="col mt-3 form-floating">
              <input type="text" className="form-control" id="branchcode" placeholder="Branch Code" name="branchcode" value={user.branchcode} onChange={handleInput} required />
              <label className="mx-3" htmlFor="branchcode">Branch Code</label>
            </div>
          </div>
          <div className="row align-items-center mt-4 inputBox">
            <div className="col mt-1 form-floating">
              <input type="number" className="form-control" id="interest" placeholder="interest rate" name="interest" value={user.interest} onChange={handleInput}  required />
              <label className="mx-3" htmlFor="interest">Rate of Interest <small>(% per annum)</small></label>
            </div>
          </div>
          <div className="row align-items-center inputBox mt-4">
            <div className="col mt-1 form-floating">
              <input type="password" className="form-control" name="password" value={user.password} onChange={handleInput} id="password" placeholder="password" required />
              <label className="mx-3" htmlFor="password">Password</label>
            </div>
         
          </div>
         
          <div className="row justify-content-start mt-3">
            <div className="col  d-flex flex-column justify-content-center align-items-center">
  
              <button className="btn btn-primary mt-3" onClick={(e) => submitDetails(e)}>Submit</button>
            </div>
          </div>
      </div>
    </form>
  </div>
{/* <div className="container">
  <form className="row justify-content-center" method="post">
    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
    <span className='title'>Bank Details</span>
    <div class="input-group flex-nowrap">
    <span class="input-group-text" id="addon-wrapping">Bank Name</span>
    <input type="text" class="form-control" placeholder="Bank Name" aria-label="Bank Name" aria-describedby="addon-wrapping"  name="bankname" value={user.bankname} onChange={handleInput}  required />

    </div>
    <div class="input-group flex-nowrap">
    <span class="input-group-text" id="addon-wrapping">Bank ID</span>
    <input type="text" class="form-control" placeholder="Bank ID" aria-label="Bank ID" aria-describedby="addon-wrapping" name="bankid" value={user.bankid} onChange={handleInput} required />

    </div>
    <div class="input-group flex-nowrap">
    <span class="input-group-text" id="addon-wrapping">IFSC Code</span>
    <input type="text" class="form-control" placeholder="IFSC Code" name="ifsc" value={user.ifsc} aria-label="IFSC Code" aria-describedby="addon-wrapping" onChange={handleInput} required/>

    </div>
    <div class="input-group flex-nowrap">
    <span class="input-group-text" id="addon-wrapping">Bank Address</span>
    <input type="text" class="form-control" placeholder="Address" name="address" value={user.address} aria-label="Bank Address" aria-describedby="addon-wrapping" onChange={handleInput} required/>

    </div>
    
    <div class="input-group flex-nowrap">
    <span class="input-group-text" id="addon-wrapping">Branch Code</span>
    <input type="text" class="form-control" placeholder="Branch Code" name="branchcode" value={user.branchcode} aria-label="Branch Code" aria-describedby="addon-wrapping" onChange={handleInput} required/>

    </div>
    <div class="input-group flex-nowrap">
    <span class="input-group-text" id="addon-wrapping">Rate of Interest<small>(% per annum)</small></span>
    <input type="number" class="form-control" placeholder="interest rate" name="interest" value={user.interest} aria-label="Interest" aria-describedby="addon-wrapping" onChange={handleInput} required/>

    </div>
    <div class="input-group flex-nowrap">
    <span class="input-group-text" id="addon-wrapping">Password</span>
    <input type="password" class="form-control" placeholder="password" name="password" value={user.password} aria-label="Password" aria-describedby="addon-wrapping" onChange={handleInput} required/>

    </div>
    <div class="d-grid gap-2">

    <button class="btn btn-dark" type="button" onClick={(e) => submitDetails(e)}>Submit</button>
    </div>
    </div>
  </form>
    
</div> */}

</>

)
}

export default RegisterBank;
