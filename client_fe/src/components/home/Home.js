import React from 'react';
import './Home.css';
import Header from '../header/Header';
import bgimage from '../../assets/im.png'
import aboutimage from '../../assets/about.png';
function Home() {
    return (
        <>
    <div className="home">
        <Header />
    {/* <h1>Buys Monefy</h1> */}
    <div className='d-flex align-items-center justify-content-between container pt-4'>
        <div className='home-details'>
            {/* <h1 className="home-details-heading">Welcome to <br /><span>BuyS Monefy</span></h1>
            <h4>A website to settle buyer and supplier payment.</h4> */}
            <h1 class="display-3 text-center text-md-start">
              Welcome to <br /> <span class="text-primary">BuyS Monefy</span>.
            </h1>
            <h4 class="display-6 text-center text-md-start">
              Transactions made simple.
              </h4>
            <p class="lead text-center text-md-start text-muted mb-6 mb-lg-8">
            A website to settle buyer and supplier payment.
            </p>
            <a href="overview.html" class="btn btn-lg btn-primary shadow lift me-1">
                Login
              </a>
        </div>
        <img src = {bgimage} />
    </div>
    <div className='about py-5 my-3 d-flex flex-column align-items-center'>
        <h1 class="display-3 text-md-start text-primary my-4">About</h1>
        <div className='d-flex justify-content-between align-items-center'>
            <img src = {aboutimage} />
            <p className='lead text-center text-md-start text-muted mb-6 mb-lg-8'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
        </div>
    </div>
    </div>
    </>
    )
}

export default Home
