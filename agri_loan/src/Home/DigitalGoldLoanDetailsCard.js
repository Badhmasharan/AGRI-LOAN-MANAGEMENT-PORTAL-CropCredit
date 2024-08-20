import React, { useState } from 'react';
import './LoanDetailsCard.css';
import { SiTicktick } from "react-icons/si";
import { useNavigate } from 'react-router-dom';


const DigitalGoldLoanDetailsCard = ({ onClose }) => {
  const [selectedMenu, setSelectedMenu] = useState('features');
  
  const navigate = useNavigate(); 

  const handleApplyNow = () => {
    navigate('/apply'); 
  };

  const details = {
    typeOfFacility: 'Digital Gold Loan',
    quantumOfLoan: 'Up to $100,000',
    repayment: '24 months',
    security: 'Gold as Collateral',
    eligibilityCriteria: 'Criteria for Digital Gold Loan',
    documentsRequired: 'Documents for Digital Gold Loan',
    interestRate: '7% per annum'
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'features':
        return (
          <div className="features-content">
            <h2>Features:</h2>
            <ul>
              <li><strong><SiTicktick className='tick-icon'/>Type of Facility:</strong>Demand Loan </li>
              <li><strong><SiTicktick className='tick-icon'/>Quantum of Loan:</strong>Basis of Advance value of gold ornaments per gram of different level of purity (24/22/20/18 carats) </li>
              <li><strong><SiTicktick className='tick-icon'/>Repayment:</strong>12 months from the date of disbursement of the loan. </li>
              <li><strong><SiTicktick className='tick-icon'/>Security:</strong>Pledge of gold ornaments </li>
            </ul>
          </div>
        );
      case 'eligibility':
        return <div>
          <h2>Eligibility Criteria:</h2>
            <p><SiTicktick className='tick-icon'/>Farmers engaged in progressive or scientific farming.</p>
            <p><SiTicktick className='tick-icon'/>Minimum land holding: At least having 4 acres of land holding or farmer is engaged in scientific methods of farming.</p>
            <p><SiTicktick className='tick-icon'/>Credit score: 650 and above.</p>
            <p><SiTicktick className='tick-icon'/>Age Criteria: Min. 18 years, Max. 70 years. (Above 60 yrs., Co-borrower is must).</p>
            <p><SiTicktick className='tick-icon'/>For Corporates: Must be earning profit for 2 years as per audited/actual/projected balance sheet.</p>
           
        </div>;
      case 'documents':
        return <div>
           <h2>Documents Required:</h2>
            <p><SiTicktick className='tick-icon'/>KYC documents</p>
            <p><SiTicktick className='tick-icon'/>Loan application</p>
            <p><SiTicktick className='tick-icon'/>Land ownership proof/ Registered lease document in case of lease cultivators.</p>
            <p><SiTicktick className='tick-icon'/>Any other document as per sanction.</p>
           
        </div>;
      case 'interestRate':
        return <div>
          <h2>Interest Rate</h2>
          <p><SiTicktick className='tick-icon'/>Interest Rate:One Year MCLR rate + 1.25 %.</p>
          <p><SiTicktick className='tick-icon'/>Processing/ Inspection Charges<br></br>
             -Upto Rs.50,000 : NIL<br></br>
-Above Rs.50,000 to up to Rs.2.00 lakhs: Rs.500 + GST.<br></br>
-Above Rs.2.00 lakhs : 0.30% of loan limit + GST.</p>
        </div>;
      default:
        return null;
    }
  };

  return (
    <div className="loan-details-card">
       <div className='card-buttons11'>
     <button className='main-button11'><img className="icon-plant" src="plant.svg"/>Crop<span className="span-title11">Credit</span></button>
     <button className='card-section11'>Digital Gold Loan</button>
     </div>
      <button className="close-button" onClick={onClose}>X</button>
      <div className="content">
        <div className="menu">
          <div
            className={`menu-item ${selectedMenu === 'features' ? 'active' : ''}`}
            onClick={() => setSelectedMenu('features')}
          >
            Features
          </div>
          <div
            className={`menu-item ${selectedMenu === 'eligibility' ? 'active' : ''}`}
            onClick={() => setSelectedMenu('eligibility')}
          >
            Eligibility Criteria
          </div>
          <div
            className={`menu-item ${selectedMenu === 'documents' ? 'active' : ''}`}
            onClick={() => setSelectedMenu('documents')}
          >
            Documents Required
          </div>
          <div
            className={`menu-item ${selectedMenu === 'interestRate' ? 'active' : ''}`}
            onClick={() => setSelectedMenu('interestRate')}
          >
            Interest Rate
          </div>
        </div>
        <div className="details">
          {renderContent()}
        </div>
      </div>
      <button className="apply-now-button11" onClick={handleApplyNow}>Apply Now</button>
    </div>
  );
};

export default DigitalGoldLoanDetailsCard;
