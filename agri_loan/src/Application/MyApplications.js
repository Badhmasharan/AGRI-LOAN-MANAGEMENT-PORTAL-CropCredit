import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbbar';
import Footer from '../Footer/Footer';
import './MyApplications.css';
import { TbReportSearch } from "react-icons/tb";
import axios, { Axios } from 'axios';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const fetchLoggedInUserId = async () => {
    try {
        const response2 = await axios.get(`http://localhost:8080/data/getallbyuser`);
        setApplications(response2.data);
        console.log(response2.data);
        
      } catch (error) {
        console.error('Error fetching logged-in user:', error);
      }
    };
    
  useEffect(() => {
      // fetchLoggedInUserId();
      // setTimeout( () => {
        fetchLoggedInUserId();
    // }, 500);
    }, []);



  const handleDelete = async (id) => {
    try {
      setTimeout(async () => {
        const response = await axios.delete(`http://localhost:8080/data/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        // setApplications(applications.filter(app => app.id !== id));
        
      }, 100);
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return 'N/A';
    const visibleDigits = accountNumber.slice(-4);
    const maskedDigits = accountNumber.slice(0, -4).replace(/./g, 'X');
    return `${maskedDigits}${visibleDigits}`;
  };

  const getLoanTypeIcon = (loanType) => {
    switch (loanType) {
      case 'Crop Loan':
        return <img src='./W2B1.svg' className='my-application-icon' alt='Crop Loan Icon' />;
      case 'Digital Gold Loan':
        return <img src='./W2B2.svg' className='my-application-icon' alt='Digital Gold Loan Icon' />;
      case 'Agri Credit Card':
        return <img src='./W2B3.svg' className='my-application-icon' alt='Agri Credit Card' />;
      case 'Farm Mechanisation Loan':
        return <img src='./W2B5.svg' className='my-application-icon' alt='Farm Mechanisation Loan Icon' />;
      default:
        return null;
    }
  };

  const getStatusButton = (status) => {
    switch (status) {
      case 'Waiting Review':
        return <button className='status-button waiting-review'>Waiting for Review</button>;
      case 'Approved':
        return <button className='status-button-approved'>Approved</button>;
      case 'Rejected':
        return <button className='status-button-rejected'>Rejected</button>;
      default:
        return <button className='status-button-waiting-review'><TbReportSearch className='waiting-search' /> Waiting for Review</button>;
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); 
  };

  return (
    <div>
      <Navbar />
      <div className='my-applications'>
        <br /><br /><br /><br />
        <div><h2>My Applications</h2></div>
        <div className='my-application-container'>
          <div className='application-library'>
            {applications.length === 0 ? (
              <p className='no-applications'>No applications submitted yet.</p>
            ) : (
              applications.map((app) => (
                <div className='application-card' key={app.id}>
                  <div className='loan-icon'>{getLoanTypeIcon(app.loanType)}</div>
                  <h4>Application Id: {app.dataId}</h4>
                  <div className='para-bg'><p><strong>Name:</strong> {app.firstName} {app.lastName}</p></div>
                  <div className='para-bg'><p><strong>Loan Type:</strong> {app.loanType}</p></div>
                  <div className='para-bg'><p><strong>Loan Amount:</strong> {app.loanAmount}</p></div>
                  <div className='para-bg'><p><strong>Bank Name:</strong> {app.bankName}</p></div>
                  <div className='para-bg'><p><strong>Account Number:</strong> {maskAccountNumber(app.accountNumber)}</p></div>
                  <div><p><strong>Date Applied:</strong> {formatDate(app.submittedAt)}</p></div>
                  <div className='application-button-container'>
                    <button className='delete-button' onClick={() => handleDelete(app.dataId)}>Delete</button>
                    {getStatusButton(app.loanStatus)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyApplications;
