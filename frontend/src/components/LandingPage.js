import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';  // CSS file for styling

const Header = () => {
  const navigate = useNavigate();
  
  return (<>
    <header className="header">
      <div className="header-left">
        <img src="/images/logo.png" alt="Logo" onClick={() => navigate('/')} className="header-logo" />
        <h2 className="header-greeting">XYZ Technologies</h2>
      </div>
    </header>
    
    </>);
};

export default Header;
