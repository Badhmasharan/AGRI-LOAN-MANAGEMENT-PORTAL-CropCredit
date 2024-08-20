import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoanApplications.css';
import Sidebar from './Sidebar';
import Modal from './Modal';
import { FcPrint } from "react-icons/fc";
import AdminNavbar from './AdminNavbar';

const LoanApplications = () => {
  const [loanData, setLoanData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortColumn, setSortColumn] = useState('');

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/data/getall');
        setLoanData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching loan data:', error);
        setLoading(false);
      }
    };

    fetchLoanData();
  }, []);

  const filterApplications = (category) => {
    setActiveCategory(category);
    let filtered = loanData;
    switch (category) {
      case 'Approved':
        filtered = loanData.filter(app => app.loanStatus === 'Approved');
        break;
      case 'Rejected':
        filtered = loanData.filter(app => app.loanStatus === 'Rejected');
        break;
      case 'Yet to Review':
        filtered = loanData.filter(app => app.loanStatus === 'Yet to Review');
        break;
      case 'All':
      default:
        filtered = loanData.filter(app => app.loanStatus === 'Yet to Review');
        break;
    }
    if (dateFilter) {
      filtered = filtered.filter(app => new Date(app.submittedAt).toISOString().split('T')[0] === dateFilter);
    }
    if (sortColumn) {
      filtered = filtered.sort((a, b) => {
        if (sortDirection === 'asc') {
          return new Date(a[sortColumn]) - new Date(b[sortColumn]);
        } else {
          return new Date(b[sortColumn]) - new Date(a[sortColumn]);
        }
      });
    }
    setFilteredData(filtered);
  };

  const handleViewClick = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedApplication(null);
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:8080/data/editDataLoanStatus/${applicationId}/${newStatus}`);
        // method: 'PATCH',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        // body: JSON.stringify({ loanStatus: newStatus }),
      // });

      if (response.ok) {
        setLoanData(prevData => prevData.map(app =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        ));
        setFilteredData(prevData => prevData.map(app =>
          app.id === applicationId ? { ...app, status: newStatus } : app
        ));
      }
      else{

        throw new Error('Network response was not ok.');
      }

      // Update local state
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
    filterApplications(activeCategory);
  };

  const handleSort = (column) => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(newDirection);
    filterApplications(activeCategory);
  };
    const [loanApplications, setLoanApplications] = useState([]);
  
    const fetchLoanApplications = async () => {
      try {
        const response = await axios.get('http://localhost:8080/data/getall');
        setLoanApplications(response.data);
      } catch (error) {
        console.error('Error fetching loan applications:', error);
      }
    };
  
    useEffect(() => {
      fetchLoanApplications();
    }, []);
  
    const handleRefresh = () => {
      fetchLoanApplications(); // Fetch the latest data
    };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
      <head>
        <title>Print Applications</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 8px 12px; border: 1px solid #ddd; text-align: left; }
          th { background-color: #f4f4f4; }
          @media print {
            .print-btn { display: none; } /* Hide the print button */
          }
        </style>
      </head>
      <body>
        <h2>Loan Applications</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Applicant Name</th>
              <th>Loan Amount</th>
              <th>Loan Type</th>
              <th>Date Applied</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${filteredData.map(loan => `
              <tr>
                <td>${loan.dataId}</td>
                <td>${loan.firstName} ${loan.lastName}</td>
                <td>${loan.loanAmount}</td>
                <td>${loan.loanType}</td>
                <td>${new Date(loan.submittedAt).toLocaleDateString()}</td>
                <td>${loan.status}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <button onclick="window.print()">Print</button>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
  };


  

  return (
    <div className='main-container-admin'>
      <AdminNavbar />
      <div>
        <Sidebar />
        <div className="loan-applications-container">
          <h2>Loan Applications</h2>

          <div className="cards-container">
            <div className="card" onClick={() => filterApplications('All')}>
              <h3>All Applications</h3>
              <p>{loanData.length}</p>
            </div>
            <div className="card card-approved" onClick={() => filterApplications('Approved')}>
              <h3>Approved Applications</h3>
              <p>{loanData.filter(app => app.loanStatus === 'Approved').length}</p>
            </div>
            <div className="card card-rejected" onClick={() => filterApplications('Rejected')}>
              <h3>Rejected Applications</h3>
              <p>{loanData.filter(app => app.loanStatus === 'Rejected').length}</p>
            </div>
            <div className="card" onClick={() => filterApplications('Yet to Review')}>
              <h3>Yet to Review</h3>
              <p>{loanData.filter(app => app.loanStatus === 'Yet to Review').length}</p>
            </div>
          </div>
          <div className='print-function'>
           <div> <button onClick={handlePrint} className="print-btn"><FcPrint className='print-icon' />Print</button></div>
           <div><button onClick={handleRefresh} className="print-btn">
  Refresh
</button></div>

          </div>
          <table className="loan-applications-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Applicant Name</th>
                <th>Loan Amount</th>
                <th>Loan Type</th>
                <th>
                  <button onClick={() => handleSort('submittedAt')}>
                    Date Applied
                    {sortColumn === 'submittedAt' && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
                  </button>
                </th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((loan) => (
                <tr key={loan.dataId}>
                  <td>{loan.dataId}</td>
                  <td>{loan.firstName} {loan.lastName}</td>
                  <td>{loan.loanAmount}</td>
                  <td>{loan.loanType}</td>
                  <td>{new Date(loan.submittedAt).toLocaleDateString()}</td>
                  <td>{loan.loanStatus}</td>
                  <td>
                    <button className="view-btn" onClick={() => handleViewClick(loan)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && selectedApplication && (
            <Modal
              show={showModal}
              onClose={handleCloseModal}
              application={selectedApplication}
              onStatusChange={handleStatusChange}
              onRefresh={handleRefresh}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanApplications;
