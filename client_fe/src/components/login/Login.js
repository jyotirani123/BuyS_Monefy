import './Login.css';
import options from '../../Constants';
import React , {useState,useEffect} from "react";
import axios from 'axios';

function Login() {
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
  const loginValidate = () => {
    axios.post("http://localhost:3001/loginValidate", 
    {
      userName : login.userName , 
      password : login.password,
      userType : login.userType,
    }).then ((res) => {
      console.log(res);
    });
  };

  return (
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
  );
}

export default Login;
