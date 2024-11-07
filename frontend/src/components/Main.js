import React from 'react';
import '../styles/Header.css';  // CSS file for styling
import LandingPage from './LandingPage';
const Main = () => {
  
  
  return (<>
    <LandingPage/>
    <div className="home-container" style={{height:'93vh'}} >
            <div className="marquee">
            <span>Welcome to the XYZ Technologies!!!</span>
            </div>
            <h1 style={{marginTop:'100px'}}>We Are The Best</h1>
            <p>Trusted and professional business consultant to fulfill your<br/> dreams with latest technology putting on project.</p>
            <div align='center'>
            <button className="link"><a href="/login">Login</a></button>
            </div>
        </div>
    </>);
};

export default Main;
