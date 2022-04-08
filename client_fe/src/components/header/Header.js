import React, { useState } from 'react';
import styles from './Header.module.css';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../../assets/logo.png';
import {sessionConst } from '../../Constants';
function Header() {
  const [usertype, setUsertype]=useState(sessionStorage.getItem(sessionConst.userType));
  console.log(usertype);
  const navigate = useNavigate();
  const logoutHandle = (e) => {
    e.preventDefault();
    window.sessionStorage.setItem(sessionConst.userType, null);
    setUsertype(null);
    navigate('/');
    console.log(usertype);
  }
    return (
        <>
        {/* <div className="home__nav"> */}
            {/* <span className="title">Buys Monefy</span> */}
            {/* <Link to='/'style={{ textDecoration: 'none' }}> <span className="home__navInfo3">Home</span></Link>
        <div className="home__navInfo">
        
        <Link to='/signup' style={{ textDecoration: 'none' }} >
            <span className="home__navInfo1">Sign Up</span></Link>
            <Link to='/login' style={{ textDecoration: 'none' }}>
            <span className="home__navInfo2" >Login</span></Link>
            <Link to='/registerb' style={{ textDecoration: 'none' }}>
            <span className="home__navInfo2" >Register bank</span></Link>
            
            </div>
            </div> */}

<nav class={`navbar navbar-expand-lg navbar-light mb-2 bg-white ${styles["navbar1"]}`}>
<div className={`d-flex align-items-center justify-content-center ${styles["header-nav-container"]}`}>

  <Link  to="/" class="navbar-brand">
    <img src={logo} class="navbar-brand-img" id={styles["logo-img"]} alt="logo" />
  </Link>

  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarCollapse">

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fe fe-x"></i>
    </button>

    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        {usertype==2?<Link to="/Buyer" class={`nav-link ${styles["nav-link"]}`} id="navbarLandings" >
          Home
        </Link>:( usertype == 3 ? (<Link to="/UserProfile" class={`nav-link ${styles["nav-link"]}`} id="navbarLandings" >
          Home
        </Link>) : (usertype==4?(<Link to="/Bankhome" class={`nav-link ${styles["nav-link"]}`} id="navbarLandings" >
          Home
        </Link>):(usertype==1?(<Link to="/Admin" class={`nav-link ${styles["nav-link"]}`} id="navbarLandings" >
          Home
        </Link>):(<Link to="/" class={`nav-link ${styles["nav-link"]}`} id="navbarLandings" >
          Home
        </Link>))))}
      </li>
      <li class="nav-item">
        {usertype==2?<Link to="/PurchaseItem" class={`nav-link ${styles["nav-link"]}`} id="navbarPages" >
         Purchase Item
        </Link>:( usertype == 3 ? (<Link to="/itemDetails" class={`nav-link ${styles["nav-link"]}`} id="navbarLandings" >
         Item Details
        </Link>) :(usertype==4?(<Link to="/BankDashboard" class={`nav-link ${styles["nav-link"]}`} id="navbarLandings" >
          Bank Dashboard
        </Link>): (<Link to="/" class={`nav-link ${styles["nav-link"]}`} id="navbarLandings" >
          About
        </Link>)))}
      </li>
      <li class="nav-item">
        {usertype==2?<Link to="/createaccount" class={`nav-link ${styles["nav-link"]}`} id="navbarAccount">
          Create Bank Account
        </Link>:( usertype == 3 ? (<Link to="/createaccount" class={`nav-link ${styles["nav-link"]}`} id="navbarAccount">
          Create Bank Account
        </Link>):(usertype==4?(<></>): (<Link to="/" class={`nav-link ${styles["nav-link"]}`} id="navbarLandings" >
         Services
        </Link>)))}
      </li>
      <li class="nav-item">
       { usertype==2?<Link to="/ViewTransactions" class={`nav-link ${styles["nav-link"]}`} id="navbarDocumentation" >
          View Transactions
        </Link>:( usertype == 3 ? (<></>):(usertype==4?(<></>):(<Link to="/" class={`nav-link ${styles["nav-link"]}`} id="navbarAccount">
          Contact
        </Link>)))}
        
      </li>
    </ul>

   {(usertype==2 || usertype == 3 || usertype == 4 || usertype == 1) ? (<div className={styles['header-butns']}>
    <button class="navbar-btn btn btn-sm btn-primary lift ms-auto mx-2" onClick={logoutHandle} >
      Logout
    </button>
    </div> ) : ( <div className={styles['header-butns']}>
    <Link to="/Login" class="navbar-btn btn btn-sm btn-primary lift ms-auto mx-2"  >
      Login
    </Link>
    <Link to="/signup" class="navbar-btn btn btn-sm btn-primary lift ms-auto mx-2" >
      Sign Up
    </Link>
    </div>) 
    }

  </div>

</div>
</nav>
</>
    )
}

export default Header
