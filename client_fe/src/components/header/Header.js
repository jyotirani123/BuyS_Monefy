import React from 'react';
import styles from './Header.module.css';
import {Link} from 'react-router-dom';
import logo from '../../assets/logo.png'
function Header() {
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

<nav class="navbar navbar-expand-lg navbar-light bg-white">
<div className={`d-flex align-items-center justify-content-center ${styles["header-nav-container"]}`}>

  <a class="navbar-brand">
    <img src={logo} class="navbar-brand-img" id={styles["logo-img"]} alt="logo" />
  </a>

  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarCollapse">

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fe fe-x"></i>
    </button>

    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        <a class={`nav-link ${styles["nav-link"]}`} id="navbarLandings" href="#">
          Home
        </a>
      </li>
      <li class="nav-item">
        <a class={`nav-link ${styles["nav-link"]}`} id="navbarPages" href="#">
          About
        </a>
      </li>
      <li class="nav-item">
        <a class={`nav-link ${styles["nav-link"]}`} id="navbarAccount" href="#">
          Services
        </a>
      </li>
      <li class="nav-item">
        <a class={`nav-link ${styles["nav-link"]}`} id="navbarDocumentation" href="#">
          Contact
        </a>
        
      </li>
    </ul>

    <div className={styles['header-butns']}>
    <a class="navbar-btn btn btn-sm btn-primary lift ms-auto mx-2" href="https://themes.getbootstrap.com/product/landkit/" target="_blank">
      Login
    </a>
    <a class="navbar-btn btn btn-sm btn-primary lift ms-auto mx-2" href="https://themes.getbootstrap.com/product/landkit/" target="_blank">
      Sign Up
    </a>
    <a class="navbar-btn btn btn-sm btn-primary lift ms-auto mx-2" href="https://themes.getbootstrap.com/product/landkit/" target="_blank">
      Register Bank
    </a>
    </div>

  </div>

</div>
</nav>
</>
    )
}

export default Header
