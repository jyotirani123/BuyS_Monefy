import React from 'react'
import './App.css';
import Home from './components/home/Home';
import Login from './components/login/Login';
import SignUp from './components/signup_page/SignUp';
import Supplier from './components/supplier_data/Supplier';
import Header from './components/header/Header';
import Buyer_transaction from './components/buyer_transaction/Buyer_transaction';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserProfile from './components/supplierProfile/UserProfile';

function App() {

  // const [loginUser, setLoginUser] = useState({
  //   userlogin : "",
  //   passlogin : ""
  // });

  // handleUser = (user, userpas) => {
  //   setLoginUser({
  //       userlogin: user,    //We can also write !inputText because typecasting is possible in javascript
  //       passlogin: userpas,
  //   });
  // };

  return (
  <Router>
    <div className="App"> 
 {/* <Header /> */}
    <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<SignUp/>}/>
          <Route exact path="/buyer_transaction" element={<Buyer_transaction/>}/>
          <Route exact path = "/ItemDetails" element = {<Supplier />} />
          <Route exact path = "/UserProfile" element = {<UserProfile />} />
 
    </Routes>
     
     
    </div>
    </Router>
   
  );
}

export default App;
