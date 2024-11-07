import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/home" className="navbar-link">Home</Link>
        <Link to="/employees" className="navbar-link">Employee List</Link>
      </div>
    </nav>
  );
};

export default Navbar;
