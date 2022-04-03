import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './components/home/Home';
import Login from './components/login/Login';
import SignUp from './components/signup_page/SignUp';
import Buyer from './components/buyer/Buyer';
import Supplier from './components/supplier_data/Supplier';
import PurchaseItem from './components/purchaseItem/PurchaseItem';
import UserProfile from './components/supplierProfile/UserProfile';
import RegisterBank from './components/banker/RegisterBank';
import BankDashboard from './components/banker/BankDashboard';
import CustomerInfo from './components/banker/CustomerInfo';
import CreateAccount from './components/banker/CreateAccount';


function App() {

  return (
    <Router>
      <div className="App">
        <Routes>

          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/" element={<Header/>}/> */}
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/buyer" element={<Buyer />} />
          <Route exact path="/purchaseItem" element={<PurchaseItem />} />
          <Route exact path="/ItemDetails" element={<Supplier />} />
          <Route exact path="/UserProfile" element={<UserProfile />} />
          <Route exact path="/createaccount" element={<CreateAccount />} />
          <Route exact path="/customerInfo" element={<CustomerInfo />} />
          <Route exact path="/bankdashboard" element={<BankDashboard />} />
          <Route exact path="/registerb" element={<RegisterBank />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
        </Routes>


      </div>
    </Router>

  );
}

export default App;
