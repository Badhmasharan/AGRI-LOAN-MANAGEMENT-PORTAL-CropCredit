import React, { useState } from 'react';
import './LoanDetailsCard.css';
import { SiTicktick } from "react-icons/si";
import { useNavigate } from 'react-router-dom';


const CropLoanDetailsCard = ({ onClose }) => {
  const [selectedMenu, setSelectedMenu] = useState('features');
  
  const navigate = useNavigate(); 

  const handleApplyNow = () => {
    navigate('/apply'); 
  };

  const details = {
    typeOfFacility: 'Crop Loan',
    quantumOfLoan: 'Up to $50,000',
    repayment: '12 months',
    security: 'Collateral Required',
    eligibilityCriteria: 'Criteria for Crop Loan',
    documentsRequired: 'Documents for Crop Loan',
    interestRate: '5% per annum'
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'features':
        return (
          <div className="features-content">
            <h2>Features:</h2>
            <ul>
              <li><strong><SiTicktick className='tick-icon' />Type of Facility:</strong> Agriculture cash credit {details.typeOfFacility}</li>
              <li>
                <strong><SiTicktick className='tick-icon'/>Quantum of Loan:</strong>
                <ul>
                  <li className='sub-list'>-Minimum Loan: ₹ 5.00 lakhs</li>
                  <li className='sub-list'>-Maximum Loan: ₹ 50.00 Crores</li>
                The quantum of loan will be based on realistic cost of end-to-end farming for any crop.
                </ul>
              </li>
              <li>
                <strong><SiTicktick className='tick-icon'/>Repayment:</strong> The repayment period will be fixed as per the anticipated harvesting and marketing period for the Crops for which the loan has been granted. {details.repayment}
              </li>
              <li>
                <strong><SiTicktick className='tick-icon'/>Security:</strong>
                <ul>
                  <li className='sub-list'>-Primary: Hypothecation of crops grown/assets to be created out of bank finance.</li>
                  <li className='sub-list'>-Collateral: Collateral Security by way of mortgage (Equitable Mortgage/Registered Mortgage) of immovable property/Agriculture land to be obtained for aggregate loan limit.</li>
                </ul>
                
              </li>
            </ul>
          </div>
        );
      case 'eligibility':
        return (
          <div>
            <h2>Eligibility Criteria:</h2>
            <p><SiTicktick className='tick-icon'/>Farmers engaged in progressive or scientific farming.</p>
            <p><SiTicktick className='tick-icon'/>Minimum land holding: At least having 4 acres of land holding or farmer is engaged in scientific methods of farming.</p>
            <p><SiTicktick className='tick-icon'/>Credit score: 650 and above.</p>
            <p><SiTicktick className='tick-icon'/>Age Criteria: Min. 18 years, Max. 70 years. (Above 60 yrs., Co-borrower is must).</p>
            <p><SiTicktick className='tick-icon'/>For Corporates: Must be earning profit for 2 years as per audited/actual/projected balance sheet.</p>
           
          </div>
        );
      case 'documents':
        return (
          <div>
            <h2>Documents Required:</h2>
            <p><SiTicktick className='tick-icon'/>KYC documents</p>
            <p><SiTicktick className='tick-icon'/>Loan application</p>
            <p><SiTicktick className='tick-icon'/>Land ownership proof/ Registered lease document in case of lease cultivators.</p>
            <p><SiTicktick className='tick-icon'/>Any other document as per sanction.</p>
           
          </div>
        );
      case 'interestRate':
        return (
          <div>
            <h2>Interest Rate:</h2>
            <p><SiTicktick className='tick-icon'/>Below ₹ 50.00 Lakhs - 1.80% above 1-Year MCLR</p>
            <p><SiTicktick className='tick-icon'/>₹ 50.00 lakhs and above - Based on Credit Risk Assessment.</p>
            
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="loan-details-card">
      <div className='card-buttons11'>
     <button className='main-button11'><img className="icon-plant" src="plant.svg"/>Crop<span className="span-title11">Credit</span></button>
     <button className='card-section11'>Crop Loan</button>
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

export default CropLoanDetailsCard;
