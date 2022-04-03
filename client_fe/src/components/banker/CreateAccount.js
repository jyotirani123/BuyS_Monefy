import React ,{useState} from 'react'
// import './CreateAccount.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useStateValue} from "./StateProvider";
import Header from '../header/Header';


function CreateAccount() {
  
  const [state,dispatch]=useStateValue();
    let navigate = useNavigate();
    const [user, setUser] = useState({
            customername:"",
            accnum:"",    
            bankname:"",
            ifsc:"",
            
  
  
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
    //BANK ACCOUNT GENERATED AUTOMATICALLY...
    // user.accnum=Math.floor(100000000000+Math.random()*900000000000);
  // console.log(state);
    // console.log(user.customername,user.accnum,user.bankname,user.ifsc);
    axios.post("http://localhost:3001/api/createAccount", 
    {
          customername : user.customername,
          accnum:user.accnum,
          bankname:user.bankname,
          ifsc : user.ifsc,
      },).then((res) => {

    console.log("post body");
   
   
  }).catch((err) => { 
      console.log('Axios Error:', err);
 });
 axios.get("http://localhost:3001/api/createAccount", 
      {customername : user.customername,
        accnum:user.accnum,
        bankname:user.bankname,
        ifsc : user.ifsc,},).then((res) => {
        //  window.sessionStorage.setItem("bankaccounts",res.data[0]);
         console.log("FRESH:  ",res.data);
 
    window.sessionStorage.setItem("acc",JSON.stringify(res.data));
    
   
          navigate("/");
         
        }).catch((err) => { 
            console.log('Axios Error:', err);
       });

     
  
    };


    return (
      <>
      
          <div className="container">
          <Header />
          <form className="row justify-content-center" method="post">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="row">
                <div className="col text-center">
                  <h1 className="heading">Create Bank Account</h1>
                  
                </div>
              </div>
              <div className="row align-items-center inputBox">
                <div className="col mt-3 form-floating">
                  <input type="text" className="form-control" id="customername" name="customername" value={user.customername} onChange={handleInput} placeholder="Enter Full Name" required />
                  <label className="mx-3" htmlFor="cystomername">Full Name</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col form-floating mt-1">
                  <input type="text" className="form-control" id="bankname"name="bankname" value={user.bankname} onChange={handleInput} placeholder="Bank Name" required/>
                  <label className="mx-3" htmlFor="bankname">Bank Name</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 form-floating">
                  <input type="text" className="form-control" id="ifsc" name="ifsc" value={user.ifsc}  onChange={handleInput} placeholder="ifsc" required />
                  <label className="mx-3" htmlFor="ifsc">IFSC code</label>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 form-floating">
                  <input type="email" className="form-control" id="accnum" placeholder="account no." name="accnum" value={user.accnum}  onChange={handleInput}  required />
                  <label className="mx-3" htmlFor="email">Account Number</label>
                </div>
              </div>
        
          
              <div className="row justify-content-start mt-3">
                <div className="col  d-flex flex-column justify-content-center align-items-center">
               
                  <button className="btn btn-primary mt-3"  onClick={(e) => submitDetails(e)}>Submit</button>
                </div>
              </div>
          </div>
        </form>
      </div>
      </>
  //   <div className="container">
  //   <form className="row justify-content-center" method="post">
  //     <div className="col-12 col-md-8 col-lg-6 col-xl-5">
  //     <span className='title'>Create Account</span>
  //     <div class="input-group flex-nowrap">
  //     <span class="input-group-text" id="addon-wrapping">Full Name</span>
  //     <input type="text" class="form-control" placeholder="Full Name" aria-label="Full Name" aria-describedby="addon-wrapping"  name="customername" value={user.customername} onChange={handleInput}  required />
  
  //     </div>
  //     <div class="input-group flex-nowrap">
  //     <span class="input-group-text" id="addon-wrapping">Bank Name</span>
  //     <input type="text" class="form-control" placeholder="Bank Name" aria-label="Bank Name" aria-describedby="addon-wrapping" name="bankname" value={user.bankname} onChange={handleInput} required />
  
  //     </div>
  //     <div class="input-group flex-nowrap">
  //     <span class="input-group-text" id="addon-wrapping">IFSC Code</span>
  //     <input type="text" class="form-control" placeholder="IFSC Code" name="ifsc" value={user.ifsc} aria-label="IFSC Code" aria-describedby="addon-wrapping" onChange={handleInput} required/>
  
  //     </div>
  //     <div class="input-group flex-nowrap">
  //     <span class="input-group-text" id="addon-wrapping">Account Number</span>
  //     <input type="text" class="form-control" placeholder="account no." name="accnum" value={user.accnum} aria-label="Account Number" aria-describedby="addon-wrapping" onChange={handleInput} required/>
  
  //     </div>
      
      
  //     <div class="d-grid gap-2">
  
  //     <button class="btn btn-dark" type="button" onClick={(e) => submitDetails(e)}>Submit</button>
  //     </div>
  //     </div>
  //   </form>
      
  // </div>
  )
}

export default CreateAccount
