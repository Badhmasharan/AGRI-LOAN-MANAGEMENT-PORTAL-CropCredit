import React, { useState, useEffect } from 'react';
import ScheduleModal from './ScheduleModal'; 
import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';
import './RepaymentTracking.css'; 
import { FcPrint } from "react-icons/fc";

const RepaymentTracking = () => {
  const [loans, setLoans] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/data/getall') 
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); 
        const approvedLoans = data.filter(loan => loan.loanStatus === 'Approved');
        setLoans(approvedLoans);
      })
      .catch(error => {
        setError('Error fetching data: ' + error.message);
        console.error('Error fetching approved loans:', error);
      });
  }, []);

  const handleViewSchedule = (schedule) => {
    console.log(schedule)
    setSelectedSchedule(schedule);
  };

  const handleCloseModal = () => {
    setSelectedSchedule(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    const printContent = document.querySelector('.repayment-tracking-container').innerHTML;
    printWindow.document.write('<html><head>');
    printWindow.document.write('<body >');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  if (error) return <div className="repayment-tracking-error">{error}</div>;

  return (
    <div className='main-container-admin'>
      <Sidebar />
      <AdminNavbar toggleSidebar={toggleSidebar} />
      <div className={`repayment-tracking-container ${sidebarOpen ? '' : 'sidebar-closed'}`}>
        <h2>Repayment Tracking</h2>
        <div className='print-function'>
            <button onClick={handlePrint} className="print-btn"><FcPrint className='print-icon' />Print</button>
          </div>
        <div className="repayment-tracking-table-container">
          <table className="repayment-tracking-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Applicant Name</th>
                <th>Loan Amount</th>
                <th>Schedule</th>
              </tr>
            </thead>
            <tbody>
              {loans.length > 0 ? (
                loans.map((loan) => {
                  
                  const loanAmount = parseFloat(loan.loanAmount);
                  return (
                    <tr key={loan.dataId}>
                      <td>{loan.dataId}</td>
                      <td>{loan.firstName}</td>
                      <td>₹{loanAmount.toFixed(2)}</td>
                      <td>
                        <button className="view-schedule-button" onClick={() => handleViewSchedule(loan.repaymentModels)}>View Schedule</button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4">No approved loans available.</td>
                </tr>
              )}
            </tbody>
          </table>

       
          {selectedSchedule && (
            <ScheduleModal schedule={selectedSchedule} onClose={handleCloseModal} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RepaymentTracking;
