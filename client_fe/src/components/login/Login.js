import './Login.css';
import React , {useState,useEffect} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Supplier from '../supplier_data/Supplier';
// import Buyer_transaction from '../buyer_transaction/Buyer_transaction';
import { options, sessionConst } from '../../Constants';
import Header from '../header/Header';

function Login() {
  let navigate = useNavigate();
  const [login, setLogin] = useState({
    userName : "",
    password : "",
    userType : ""
  });

  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setLogin({...login, [name] : value});
  }
  const loginValidate = async(e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/loginValidate", 
    {
      userName : login.userName , 
      password : login.password,
      userType : login.userType,
    }).then ((res) => {
      window.sessionStorage.setItem(sessionConst.userName , login.userName);
      if(login.userType === "3"){
        navigate('/UserProfile');
      }
    });
  };

  return (
    <>
    <Header />
    <div className="login">
        <h1>Login</h1>
        <form method="get">
            <div className="txt_field">
                <input type = "text" name  = "userName" value={login.userName} required onChange = {handleInput}></input>
                <label>Username</label>
            </div>
            
            <div className="txt_field">
                <input type = "password" name = "password" value={login.password} required onChange = {handleInput}></input>
                <label>Password</label>
            </div>
            
            <div className="pass">Forgot Password?</div>
            <label>Select User Type :  </label>
            <select className="txt_field" id = "ddlUserType" value={login.userType} name = "userType" onChange = {handleInput}>
                
                <option value="0">Please select</option>
                {
                    options.map((option, index)=> (<option key={index} value = {option.typeId}>{option.userType}</option>))
                }
            </select>
            <input type = "submit" value = "Login" onClick = {loginValidate}></input>
            <div className="signup_link">Not a member? <a href="#">SignUp</a></div>
        </form>
    </div>
    </>
  );
}

export default Login;
