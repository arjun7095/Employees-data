import React from "react";
import Header from '../components/Header.js';
import Navbar from "../components/Navbar";
import '../styles/Home.css';

function Home(){
    return(
        <>
        <Header/>
        <Navbar/>
        <div className="home-container" >
            <div className="marquee">
            <span>Welcome to the XYZ Technologies!!!</span>
            </div>
            <h1>We Are The Best</h1>
            <p>Trusted and professional business consultant to fulfill your<br/> dreams with latest technology putting on project.</p>
            <div align='center'>
            <button className="link"><a href="/employees">View Employees</a></button>
            </div>
        </div>
        
        </>
    )
}

export default Home;