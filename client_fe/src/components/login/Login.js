// import './Login.css';
import React, { useState, useEffect } from "react";
import { options, sessionConst } from '../../Constants'
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import axios from 'axios';

function Login() {
  let navigate = useNavigate();
  const [login, setLogin] = useState({
    userName: "",
    password: "",
    userType: ""
  });
  let name, value;
  const handleInput = (e) => {

    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setLogin({ ...login, [name]: value });
  }

  const loginValidate = async (e) => {
    // console.log(login.userName);
    e.preventDefault();
    const res = await axios.get("http://localhost:3001/api/createAccount")   
    console.log(res);   
    window.sessionStorage.setItem("acc", JSON.stringify(res.data));
    // let response = await axios.get("http://localhost:3001/api/loginValidate", )
    const response = await axios.get("http://localhost:3001/api/loginValidate",
      {
        params: {
          userName: login.userName,
          password: login.password,
          userType: login.userType,
        }
      })
      .then((response) => {
        window.sessionStorage.setItem(sessionConst.userName, login.userName);
        if (login.userType === "2") {
          navigate("/Buyer")
        }
        if(login.userType === "4"){
          console.log(response);
          navigate("/BankDashBoard");
        }
        if(login.userType === "3"){
          navigate('/UserProfile')
        }
      })
      
  };

  return (
    <>
      <Header />
      <div className="login">
        <h1>Login</h1>
        <form method="get">
          <div className="txt_field">
            <input type="text" name="userName" value={login.userName} required onChange={handleInput}></input>
            <label>Username</label>
          </div>

          <div className="txt_field">
            <input type="password" name="password" value={login.password} required onChange={handleInput}></input>
            <label>Password</label>
          </div>

          <div className="pass">Forgot Password?</div>
          <label>Select User Type :  </label>
          <select className="txt_field" id="ddlUserType" value={login.userType} name="userType" onChange={handleInput}>

            <option value="0">Please select</option>
            {
              options.map((option, index) => (<option key={index} value={option.typeId}>{option.userType}</option>))
            }
          </select>
          <input type="submit" value="Login" onClick={(e) => { loginValidate(e) }}></input>
          <div className="signup_link">Not a member? <a href="#">SignUp</a></div>
        </form>
      </div>
    </>
  );
}

export default Login;
