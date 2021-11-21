import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
function Header() {
    return (
        <div className="home__nav">
            {/* <span className="title">Buys Monefy</span> */}
            <Link to='/'style={{ textDecoration: 'none' }}> <span className="home__navInfo3">Home</span></Link>
        <div className="home__navInfo">
        
        <Link to='/signup' style={{ textDecoration: 'none' }} >
            <span className="home__navInfo1">Sign Up</span></Link>
            <Link to='/login' style={{ textDecoration: 'none' }}  >
            <span className="home__navInfo2" >Login</span></Link>
            </div>
            </div>
    )
}

export default Header
