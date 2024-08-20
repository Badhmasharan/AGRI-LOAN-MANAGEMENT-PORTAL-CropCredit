import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { Sling as Hamburger } from 'hamburger-react';
import { useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu.js";
import ApplyNowMenu from "./ApplyNowMenu.js";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [navigateToContact, setNavigateToContact] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('rememberedUsername');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  }, []);


  useEffect(() => {
    if (navigateToContact) {
      
      navigate('/');
     
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        setNavigateToContact(false); 
      }, 300);
    }
  }, [navigateToContact, navigate]);

  const handleLogin = () => {
    const enteredUsername = 'User'; 
    localStorage.setItem('rememberedUsername', enteredUsername);
    setIsLoggedIn(true);
    setUsername(enteredUsername);
    navigate('/user/login');
  };
  const handleLogout = () => {
    localStorage.removeItem('rememberedUsername');
    setIsLoggedIn(false);
    setUsername('');
    window.alert('Logged out successfully');
  };

  const handlesignup = () => {
    navigate('/signup');
  };
  const handlehome = () => {
    navigate('/');
  };
  const [showApplyNowMenu, setShowApplyNowMenu] = useState(false); 
  const handleApplyNow = () => {
    setShowApplyNowMenu(!showApplyNowMenu); // Toggle Apply Now menu
    };
  const handleContact = () => {
    if (window.location.pathname === '/') {
     
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
     
      setNavigateToContact(true);
    }
  };
  return (
    <div className='Nav-bar'>
      <div className="title-bar">
        <div><button className='main-button1' onClick={handlehome}><img className="icon-plant" src="./plant.svg"/>Crop<span className="span-title">Credit</span></button></div>
        <div><button className='main-button'onClick={handleApplyNow}>Apply Loan</button>
        {showApplyNowMenu && <ApplyNowMenu />}</div>
        <div><button className='main-button' onClick={handleContact}>Contact</button></div>
      </div>
      <div className='sub-bar'>
        <div className='user'>
          {!isLoggedIn && (
            <>
              <div>
                <button className="log-button" onClick={handleLogin}>Login</button>
              </div>
              <div>
                <button className="sign-button" onClick={handlesignup}>Sign Up Free</button>
              </div>
            </>
          )}
          {isLoggedIn && (
            <div className="profile-dropdown">
              <div className="profile-icon" onClick={() => setShowDropdown(!showDropdown)}>
                
              </div>
              {showDropdown && (
        <DropdownMenu
          username={username}
          isLoggedIn={isLoggedIn}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
        />
      )}
            </div>
          )}
        </div>
        {isLoggedIn && (
          <button className='menu-button' onClick={() => setShowDropdown(!showDropdown)}>
            <Hamburger toggled={showDropdown} toggle={setShowDropdown} />
          </button>
        )}
      </div>
    </div>
  );
}
