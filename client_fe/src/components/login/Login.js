import './Login.css';
import options from '../../Constants';
import React , {useState,useEffect} from "react";
import Axios from 'axios';

function Login() {
  const[userName,setUserName] = useState('');
  const[password,setPassword] = useState('');
  const[userType,setUserType] = useState('');
  const loginValidate = () => {
    Axios.post("http://localhost:3001/loginValidate", 
    {
      userName : userName , 
      password : password,
      userType : userType,
    }).then (res => res.json()).then (loginUser => {
        if(loginUser == null){
            console.log("not found");
            alert("User credential are wrong , pls enter correct user name and password");
        }else {
            console.log("found");
            alert("login successfully");
        }
    })
  };

  return (
    <div class="login">
        <h1>Login</h1>
        <form method="get">
            <div class = "txt_field">
                <input type = "text" name  = "userName" required onChange = {(e) => {
          setUserName(e.target.value);
        }}></input>
                <label>Username</label>
            </div>
            
            <div class = "txt_field">
                <input type = "password" name = "password" required onChange = {(e) => {
          setPassword(e.target.value);
        }}></input>
                <label>Password</label>
            </div>
            
            <div class="pass">Forgot Password?</div>
            <label>Select User Type :  </label>
            <select class = "txt_field" id = "ddlUserType" name = "userType" onChange = {(e) => {
          setUserType(e.target.value);
        }}>
                
                <option value="0">Please select</option>
                {
                    options.map((option)=> (<option value = {option.typeId}>{option.userType}</option>))
                }
            </select>
            <input type = "submit" value = "Login" onClick = {loginValidate}></input>
            <div class="signup_link">Not a member? <a href="#">SignUp</a></div>
        </form>
    </div>
  );
}

export default Login;
