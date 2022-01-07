import React from 'react'
import './App.css';
import Home from './components/home/Home';
import Login from './components/login/Login';
import SignUp from './components/signup_page/SignUp';
import Buyer from './components/buyer/Buyer';
import Header from './components/header/Header';
import PurchaseItem from './components/purchaseItem/PurchaseItem';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom'


function App() {
  return (
  <Router>
    <div className="App"> 
 
    <Routes>
          
          <Route exact path="/" element={<Home/>}/>
          {/* <Route exact path="/" element={<Header/>}/> */}
          <Route exact path="/Login" element={<Login/>}/>
          <Route exact path="/signup" element={<SignUp/>}/>
          <Route exact path ="/buyer" element={<Buyer/>}/>
          <Route exact path ="/purchaseItem" element={<PurchaseItem/>}/>
    </Routes>
     
     
    </div>
    </Router>
   
  );
}

export default App;
