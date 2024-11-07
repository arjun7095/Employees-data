import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';  // CSS file for styling
import { logout } from '../services/authService';

const Header = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('name') || '';
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLogoutClick = () => {
    setShowModal(true); // Show the confirmation modal
  };

  const handleCancel = () => {
    setShowModal(false); // Hide the confirmation modal
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <img src="/images/logo.png" alt="Logo" onClick={() => navigate('/')} className="header-logo" />
          <h2 className="header-greeting">XYZ Technologies</h2>
        </div>
        
        <div className="header-right">
          <div className="profile-icon">
            {name.charAt(0).toUpperCase()}
          </div>
          <span className="profile-name">{name}</span>
          <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
        </div>
      </header>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to log out?</h3>
            <div className="modal-buttons">
              <button className="confirm" onClick={handleLogout}>Yes</button>
              <button className="cancel" onClick={handleCancel}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
