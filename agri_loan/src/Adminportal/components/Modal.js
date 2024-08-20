import React, { useState, useEffect } from 'react';
import './Modal.css';
import { sendEmail } from './emailService';
import ReactDOM from 'react-dom';
import { FcPrint } from "react-icons/fc";
import axios from 'axios';

const Modal = ({ show, onClose, onStatusChange, application, onRefresh }) => {
  const [status, setStatus] = useState('');
  const [notification, setNotification] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    console.log(application)
    if (application) {
      setStatus(application.loanStatus);
    }
  }, [application]);

  if (!show || !application) {
    return null;
  }

  const handleApprove = async (id) => {
    // Check CIBIL score and automatically reject if not met
    if (application.cibilScore < 5) {
      await handleReject(id); // Reject the application
      return; // Exit the function
    }
  
    // If the CIBIL score is sufficient, proceed with approval
    setStatus('Approved');
    onStatusChange(id, 'Approved');
  
    let interestRate = 0;
    switch (application.loanType) {
      case 'Crop Loan':
        interestRate = 1.80 / 100;
        break;
      case 'Digital Gold Loan':
        interestRate = 1.25 / 100;
        break;
      case 'Farm Mechanisation Loan':
        interestRate = 3.30 / 100;
        break;
      case 'Agri Credit Card':
        interestRate = 7.00 / 100;
        break;
      default:
        interestRate = 0;
    }
  
    const annualAmount = application.loanAmount;
    const totalRepaymentAmount = annualAmount * (1 + interestRate);
    const monthlyRepaymentAmount = totalRepaymentAmount / 12;
  
    const today = new Date();
    const newSchedule = Array.from({ length: 12 }, (_, index) => {
      const paymentDate = new Date(today.getFullYear(), today.getMonth() + index + 1, 1); // 1st day of each month
      return {
        date: paymentDate.toISOString().split('T')[0],
        amount: monthlyRepaymentAmount.toFixed(2)
      };
    });
  
    console.log(newSchedule);
  
    await axios.post(`http://localhost:8080/data/postPayment/${application.dataId}`, newSchedule)
      .then(response => response.data)
      .then(() => {
        setNotification(`Message has been sent to ${application.firstName}`);
        setTimeout(() => setNotification(''), 3000);
        if (onRefresh) {
          onRefresh();
        }
  
        return sendEmail(
          application.email,
          'Your Loan Application Status',
          `Congratulations! Your loan application id:${application.dataId} has been approved.`
        );
      })
      .then(() => {
        setNotification(`Message has been sent to ${application.firstName}`);
        setTimeout(() => setNotification(''), 3000);
      })
      .catch(() => {
        setNotification('Failed to send message.');
        setTimeout(() => setNotification(''), 3000);
      });
  };
  
  
  const handleReject = async(id) => {
    // await axios.put(`http://localhost:8080/data/editDataLoanStatus/${id}`, { loanStatus: "Rejected"})
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     ...application,
    //     loanStatus: "Rejected"
    //   }),
    // })
    setStatus('Rejected');
    onStatusChange(application.dataId, 'Rejected'); 

    
    sendEmail(
      application.email,
      'Your Loan Application Status',
      `We regret to inform you that your loan application id:${application.dataId} has been rejected due to low cibil score.`
    )
    .then(() => {
      setNotification(`Message has been sent to ${application.firstName}`);
      setTimeout(() => setNotification(''), 3000);
    })
    .catch(() => {
      setNotification('Failed to send message.');
      setTimeout(() => setNotification(''), 3000);
    });
  };

  const handleRevertToReview = () => {
    setStatus('yet to review');
    onStatusChange(application.dataId, 'Yet to Review'); 
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh(); 
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
      <head>
        <title>Print Application</title>
        <style>
          body { font-family: Arial, sans-serif; }
          .modal-body { padding: 20px; }
          .modal-image { max-width: 100%; height: auto; }
          @media print {
            .print-btn { display: none; }
          }
        </style>
      </head>
      <body>
        <h2>Application Details</h2>
        <p><strong>ID:</strong> ${application.dataId}</p>
        <p><strong>Applicant Name:</strong> ${application.firstName} ${application.lastName}</p>
        <p><strong>Loan Amount:</strong> ${application.loanAmount}</p>
        <p><strong>Loan Type:</strong> ${application.loanType}</p>
        <p><strong>Date of Birth:</strong> ${application.birthDate}</p>
        <p><strong>Email:</strong> ${application.email}</p>
        <p><strong>Phone:</strong> ${application.phone}</p>
        <p><strong>Address:</strong> ${application.addressLine1}<br />${application.addressLine2}</p>
        <p><strong>City:</strong> ${application.city}</p>
        <p><strong>State:</strong> ${application.state}</p>
        <p><strong>Postal Code:</strong> ${application.postalCode}</p>
        <p><strong>Address Duration:</strong> ${application.addressDuration}</p>
        <p><strong>Occupation:</strong> ${application.occupation}</p>
        <p><strong>Monthly Income:</strong> ${application.monthlyIncome}</p>
        <p><strong>Bank Name:</strong> ${application.bankName}</p>
        <p><strong>Account Number:</strong> ${application.accountNumber}</p>
        <p><strong>Bank Phone:</strong> ${application.bankPhone}</p>
        <p><strong>Aadhar Upload:</strong></p>
        <img src="${application.aadharUpload}" alt="Aadhar" class="modal-image" />
        <p><strong>Photo Upload:</strong></p>
        <img src="${application.photoUpload}" alt="Photo" class="modal-image" />
        <p><strong>Land Certificate Upload:</strong></p>
        <img src="${application.landCertificateUpload}" alt="Land Certificate" class="modal-image" />
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className={`modal-overlay ${status}`}>
      <div className={`modal ${status}`}>
        <div className="modal-header">
          <h2>Application Details</h2>
          <button onClick={handlePrint} className="print-btn"><FcPrint className='print-icon' /><h4>Print</h4></button>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        <div className="modal-body">
          <p><strong>ID:</strong> {application.dataId}</p>
          <p><strong>Applicant Name:</strong> {application.firstName} {application.lastName}</p>
          <p><strong>Loan Amount:</strong> {application.loanAmount}</p>
          <p><strong>Loan Type:</strong> {application.loanType}</p>
          <p><strong>Date of Birth:</strong> {application.birthDate}</p>
          <p><strong>Email:</strong> {application.email}</p>
          <p><strong>Phone:</strong> {application.phone}</p>
          <p><strong>Address:</strong> {application.addressLine1}<br />{application.addressLine2}</p>
          <p><strong>City:</strong> {application.city}</p>
          <p><strong>State:</strong> {application.state}</p>
          <p><strong>Postal Code:</strong> {application.postalCode}</p>
          <p><strong>Address Duration:</strong> {application.addressDuration}</p>
          <p><strong>Occupation:</strong> {application.occupation}</p>
          <p><strong>Monthly Income:</strong> {application.monthlyIncome}</p>
          <p><strong>Bank Name:</strong> {application.bankName}</p>
          <p><strong>Account Number:</strong> {application.accountNumber}</p>
          <p><strong>Bank Phone:</strong> {application.bankPhone}</p>
          <p><strong>Cibil Score:</strong> {application.cibilScore}</p>
          <p><strong>Aadhar Upload:</strong></p>
          <img src={application.aadharUpload} alt="Aadhar" className="modal-image" />
          <p><strong>Photo Upload:</strong></p>
          <img src={application.photoUpload} alt="Photo" className="modal-image" />
          <p><strong>Land Certificate Upload:</strong></p>
          <img src={application.landCertificateUpload} alt="Land Certificate" className="modal-image" />
        </div>
        <div className="modal-footer">
          {status === 'yet to review' ? (
            <>
              <button onClick={()=>handleApprove(application.dataId)} className="approve-btn">Approve</button>
              <button onClick={()=>handleReject(application.dataId)} className="reject-btn">Reject</button>
            </>
          ) : (
            <>
              <button className={`status-btn ${status}`}>
                {status}
              </button>
              <button onClick={handleRevertToReview} className="revert-btn">Change Status</button>
            </>
          )}
          <button onClick={handleRefresh} className={`refresh-btn ${isSpinning ? 'spin' : ''}`}>
            <i className="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
      {notification && ReactDOM.createPortal(
        <div className="notification">{notification}</div>,
        document.body
      )}
    </div>
  );
};

export default Modal;
