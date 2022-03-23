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
<div className="container">
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
    
</div>
)
}

export default RegisterBank;
