// SubmittedApplications.jsx
import React from 'react';
import Navbar from '../Navbar/Navbbar';

const SubmittedApplications = ({ applications }) => {
  return (
   
    <div className="submitted-applications">
      <h2>Submitted Applications</h2>
      <ul>
        {applications.map((app, index) => (
          <li key={index}>
            <p><strong>Loan Amount:</strong> {app.loanAmount}</p>
            <p><strong>Annual Income:</strong> {app.annualIncome}</p>
            <p><strong>First Name:</strong> {app.firstName}</p>
            <p><strong>Last Name:</strong> {app.lastName}</p>
            {/* Add other necessary fields here */}
          </li>
        ))}
      </ul>
    </div>
   
  );
};

export default SubmittedApplications;
