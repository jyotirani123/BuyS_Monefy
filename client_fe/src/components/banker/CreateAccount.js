import React ,{useState} from 'react'
import './CreateAccount.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {useStateValue} from "./StateProvider";


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


    return (<div className="container">
    <form className="row justify-content-center" method="post">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
      <span className='title'>Create Account</span>
      <div class="input-group flex-nowrap">
      <span class="input-group-text" id="addon-wrapping">Full Name</span>
      <input type="text" class="form-control" placeholder="Full Name" aria-label="Full Name" aria-describedby="addon-wrapping"  name="customername" value={user.customername} onChange={handleInput}  required />
  
      </div>
      <div class="input-group flex-nowrap">
      <span class="input-group-text" id="addon-wrapping">Bank Name</span>
      <input type="text" class="form-control" placeholder="Bank Name" aria-label="Bank Name" aria-describedby="addon-wrapping" name="bankname" value={user.bankname} onChange={handleInput} required />
  
      </div>
      <div class="input-group flex-nowrap">
      <span class="input-group-text" id="addon-wrapping">IFSC Code</span>
      <input type="text" class="form-control" placeholder="IFSC Code" name="ifsc" value={user.ifsc} aria-label="IFSC Code" aria-describedby="addon-wrapping" onChange={handleInput} required/>
  
      </div>
      <div class="input-group flex-nowrap">
      <span class="input-group-text" id="addon-wrapping">Account Number</span>
      <input type="text" class="form-control" placeholder="account no." name="accnum" value={user.accnum} aria-label="Account Number" aria-describedby="addon-wrapping" onChange={handleInput} required/>
  
      </div>
      
      
      <div class="d-grid gap-2">
  
      <button class="btn btn-dark" type="button" onClick={(e) => submitDetails(e)}>Submit</button>
      </div>
      </div>
    </form>
      
  </div>
  )
}

export default CreateAccount
