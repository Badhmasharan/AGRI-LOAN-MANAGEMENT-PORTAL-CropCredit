import React, { useState } from 'react';
import './LoanDetailsCard.css';
import { SiTicktick } from "react-icons/si";
import { useNavigate } from 'react-router-dom';


const AgriCreditCardDetailsCard = ({ onClose }) => {
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
              <li><strong><SiTicktick className='tick-icon' />Type of Facility:</strong>Revolving cash credit account. Credit balance in the account, if any, will fetch interest at Savings bank rate.</li>
              <li>
                <strong><SiTicktick className='tick-icon'/>Quantum of Loan:</strong>
              
                Need Based finance considering cropping pattern, acreage and Scale of Finance (SOF) determined by DLTC (District Level Technical Committee).
               
              </li>
              <li>
                <strong><SiTicktick className='tick-icon'/>Repayment:</strong> The repayment period as per the crop period (Short/ Long) and marketing period for the crop.
              </li>
              <li>
                <strong><SiTicktick className='tick-icon'/>Security:</strong>
                <ul>
                  <li className='sub-list'>-Primary: Hypothecation of Crops grown / assets to be created out of Bank finance.</li>
                  <li className='sub-list'>-Collateral:Equitable mortgage / registered mortgage of land / immovable property as applicable of the value of 100 % loan. However, collateral is waived for KCC limit up to Rs. 1.60 lakh and up to Rs.3.00 lakhs, in case of tie up arrangement.</li>
                </ul>
                
              </li>

              <li>
                <strong><SiTicktick className='tick-icon'/>Interest:</strong>3% p.a. interest subvention as Prompt Repayment Incentive (PRI) up to Rs. 3.00 lakhs
              </li>
            </ul>
          </div>
        );
      case 'eligibility':
        return (
          <div>
            <h2>Eligibility Criteria:</h2>
            <p><SiTicktick className='tick-icon'/>All farmers-individuals/Joint borrowers who are owner cultivators.</p>
            <p><SiTicktick className='tick-icon'/>Tenant farmers, Oral lessees and Share croppers, etc,.</p>
            <p><SiTicktick className='tick-icon'/>SHGs or Joint Liability Groups of farmers including tenant farmers, share croppers, etc,.</p>
           
           
          </div>
        );
      case 'documents':
        return (
          <div>
            <h2>Documents Required:</h2>
            <p><SiTicktick className='tick-icon'/>Application Form.</p>
            <p><SiTicktick className='tick-icon'/>ID proof such as Driving License / Aadhar Card / Voter Identity Card / Passport, etc,. Any one document needs to be submitted.</p>
            <p><SiTicktick className='tick-icon'/>Proof of landholding duly certified by the revenue authorities.</p>
            <p><SiTicktick className='tick-icon'/>Cropping pattern (Crops grown) with acreage.</p>
           
          </div>
        );
      case 'interestRate':
        return (
          <div>
            <h2>Interest Rate:</h2>
            <p><SiTicktick className='tick-icon'/>Up to Rs. 3.00 lakhs- 7% p.a. subject to GoI providing interest subvention. For interest subvention, submission of Aadhar details to Bank is mandatory (wherever applicable).</p>
            <p><SiTicktick className='tick-icon'/>Above Rs.3.00 lakhs- as applicable from time to time</p>
            
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
     <button className='card-section11'>Agri Credit Card</button>
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

export default AgriCreditCardDetailsCard;
