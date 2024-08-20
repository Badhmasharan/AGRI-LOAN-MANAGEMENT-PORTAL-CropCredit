import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = ({ toggleSidebar }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true); 

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    toggleSidebar(); 
  };

  return (
    <nav className={`admin-navbar ${sidebarOpen ? '' : 'sidebar-closed'}`}>
      <div className="navbar-container">
        {/* <Link to="/admin/home" className="brand-title">Admin Dashboard</Link> */}
        <div className="profile-dropdown">
          <button className="profile-btn">
            <img src='/12.jpg' alt="Profile" className="profile-icon" />
          </button>
          <div className="dropdown-content">
            <Link to="/profile">Profile</Link>
            <Link to="/admin/login">Logout</Link>
          </div>
        </div>
  
      </div>
    </nav>
  );
};

export default AdminNavbar;
