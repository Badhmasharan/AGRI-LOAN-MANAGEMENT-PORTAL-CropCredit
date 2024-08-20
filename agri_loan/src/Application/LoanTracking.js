import React, { useEffect, useState } from 'react';

import './LoanTracking.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbbar';
export default function LoanTracking() {
  const [applications, setApplications] = useState([]);
  const [activeApplication, setActiveApplication] = useState(null);
  const navigate = useNavigate();
  const fetchLoggedInUserId = async () => {
    try {
      const response2 = await axios.get('http://localhost:8080/data/getallbyuser');
      const approvedApplications = response2.data.filter(app => app.loanStatus === 'Approved');
      setApplications(approvedApplications);
      console.log(approvedApplications);
    } catch (error) {
      console.error('Error fetching logged-in user:', error);
    }
  };

  useEffect(() => {
    fetchLoggedInUserId();
  }, []);

  
  const handlePayNow = (app) => {
    const { id: dataId, repaymentModels, firstName: username } = app;
    const repaymentamount = repaymentModels && repaymentModels.length > 0 
                            ? repaymentModels[0].amount 
                            : 0;

    navigate('/payment', { state: { dataId, repaymentamount, username } });
  };
  

  const handleViewRepaymentSchedule = (applicationId) => {
    setActiveApplication(prevId => (prevId === applicationId ? null : applicationId));
  };

  const renderRepaymentSchedule = (repaymentModels) => {
    return (
      <tbody>
        {repaymentModels.map((model, index) => (
          <tr key={index}>
            <td>{model.date}</td>
            <td>{model.amount}</td>
            <td>{model.paymentStatus ? 'Paid' : 'Not Paid'}</td>
          </tr>
        ))}
      </tbody>
    );
  };




  return (
    <>
    <Navbar/>
      <div className='loan-monitoring-page'>
        <div className='loan-monitoring-container'>
          <div className='loan-list-wrapper'>
            {applications.length === 0 ? (
              <p className='no-loans-message'>No approved applications.</p>
            ) : (
              <div>
                <h2>Keep track of your loans...</h2>
                <table className='loan-table'>
                  <thead>
                    <tr>
                      <th>Application Id</th>
                      <th>Name</th>
                      <th>Loan Type</th>
                      <th>Loan Amount</th>
                      <th>Date Applied</th>
                      <th>Next Repayment Date</th>
                      <th>Repayment Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <React.Fragment key={app.id}>
                        <tr>
                          <td>{app.dataId}</td>
                          <td>{app.firstName}</td>
                          <td>{app.loanType}</td>
                          <td>{app.loanAmount}</td>
                          <td>{app.submittedAt}</td>
                          <td>
                            {app.repaymentModels && app.repaymentModels.length > 0 
                              ? app.repaymentModels[0].date 
                              : 'N/A'}
                          </td>
                          <td>
                            {app.repaymentModels && app.repaymentModels.length > 0 
                              ? app.repaymentModels[0].amount 
                              : 'N/A'}
                          </td>
                          <td>
                          <button 
                              className='pay-now-btn' 
                              onClick={() => handlePayNow(app)}
                            >
                              Pay Now
                            </button>
                            <button 
                              className='view-schedule-btn' 
                              onClick={() => handleViewRepaymentSchedule(app.id)}
                            >
                              {activeApplication === app.id ? 'Hide Repayment Schedule' : 'View Repayment Schedule'}
                            </button>
                          </td>
                        </tr>
                        {activeApplication === app.id && app.repaymentModels && (
                          <tr>
                            <td colSpan="8">
                              <table className='repayment-schedule-table'>
                                <thead>
                                  <tr>
                                    <th>Repayment Date</th>
                                    <th>Repayment Amount</th>
                                    <th>Payment Status</th>
                                  </tr>
                                </thead>
                                {renderRepaymentSchedule(app.repaymentModels)}
                              </table>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
