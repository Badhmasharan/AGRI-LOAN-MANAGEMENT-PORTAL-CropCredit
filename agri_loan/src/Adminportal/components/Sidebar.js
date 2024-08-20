import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Home, Send, Users, DollarSign, Activity } from 'react-feather'; // Import DollarSign for repayment tracking
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleadminhome = () => {
    navigate('/admin/dashboard');
  };

  return (
    <aside className={`sidebar-container ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        {isOpen ? '←' : '→'}
      </button>
      <nav className="sidebar-nav">
        <div className={`admin-brand-title ${isOpen ? 'brand-title-open' : 'brand-title-closed'}`} onClick={handleadminhome}>
          <img className="icon-plant" src="/plant.svg" alt="Crop Credit" />
          {isOpen && (
            <span className="button-text">
              Crop<span className="span-admin-title">Credit</span>
            </span>
          )}
        </div>
        <NavLink
          to="/admin/dashboard"
          className="sidebar-link"
          activeClassName="active"
        >
          <Home className="sidebar-icon" />
          {isOpen && <span className="sidebar-label">Dashboard</span>}
        </NavLink>
        <NavLink
          to="/admin/LoanApplications"
          className="sidebar-link"
          activeClassName="active"
        >
          <Send className="sidebar-icon" />
          {isOpen && <span className="sidebar-label">Applications</span>}
        </NavLink>
        <NavLink
          to="/admin/users"
          className="sidebar-link"
          activeClassName="active"
        >
          <Users className="sidebar-icon" />
          {isOpen && <span className="sidebar-label">Users</span>}
        </NavLink>
        <NavLink
          to="/admin/repaymentTracking"
          className="sidebar-link"
          activeClassName="active"
        >
          <Activity className="sidebar-icon" />
          {isOpen && <span className="sidebar-label">Repayment Tracking</span>}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
