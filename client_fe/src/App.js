import React from 'react'
import './App.css';
import Home from './components/home/Home';
import Login from './components/login/Login';
import SignUp from './components/signup_page/SignUp';
import Header from './components/header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
  <Router>
    <div className="App"> 
 <Header />
    <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<SignUp/>}/>
 
    </Routes>
     
     
    </div>
    </Router>
   
  );
}

export default App;
