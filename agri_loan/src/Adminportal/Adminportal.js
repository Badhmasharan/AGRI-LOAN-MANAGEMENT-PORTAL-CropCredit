// src/Adminportal/Adminportal.js
import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LoanApplications from './components/LoanApplications';
import Users from './components/Users';
import './Styles/Adminportal.css';
import AdminNavbar from './components/AdminNavbar';

const Adminportal = () => {
  return (
    <div className="adminportal">
      
      <Sidebar />
      <div className="adminportal-content">
        <div><Dashboard /></div>
      </div>
    </div>
  );
};

export default Adminportal;
