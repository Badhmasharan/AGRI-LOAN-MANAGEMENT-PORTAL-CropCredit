import React, { useState } from 'react';
import './LoanDetailsCard.css';
import { SiTicktick } from "react-icons/si";
import { useNavigate } from 'react-router-dom';


const FarmMechanisationLoanDetailsCard = ({ onClose }) => {
  const [selectedMenu, setSelectedMenu] = useState('features');
  
  const navigate = useNavigate(); 

  const handleApplyNow = () => {
    navigate('/apply'); 
  };

  

  const renderContent = () => {
    switch (selectedMenu) {
      case 'features':
        return (
          <div className="features-content">
            <h2>Features:</h2>
            <ul>
              <li><strong><SiTicktick className='tick-icon' />Type of Facility:</strong>Agriculture Term Loan</li>
              <li>
                <strong><SiTicktick className='tick-icon'/>Quantum of Loan:</strong>
              
                Min-Rs.200000/- Max-Rs.2500000/-
               
              </li>
              <li>
                <strong><SiTicktick className='tick-icon'/>Repayment:</strong>Principle Equated Distribution with Interest in 10 half yearly Instalments.
              </li>
              <li>
                <strong><SiTicktick className='tick-icon'/>Security:</strong>
                <ul>
                  <li className='sub-list'>-Primary:Hypothecation of Tractor and accessories.</li>
                  <li className='sub-list'>-Collateral:Mortgage of land /Gold Ornaments/Any Other approved liquid security or Third-Party Guarantee.</li>
                </ul>
                
              </li>

              <li>
                <strong><SiTicktick className='tick-icon'/>Interest:</strong>Not Applicable
              </li>
            </ul>
          </div>
        );
      case 'eligibility':
        return (
          <div>
            <h2>Eligibility Criteria:</h2>
            <p><SiTicktick className='tick-icon'/>Any Individual, Group of Individuals and Institution, Organisation.</p>
            <p><SiTicktick className='tick-icon'/>Existing/New Farmer/Good Borrower banking with other banks.</p>
            <p><SiTicktick className='tick-icon'/>Applicant should hold minimum 2 acre Agricultural land .</p>
           
           
          </div>
        );
      case 'documents':
        return (
          <div>
            <h2>Documents Required:</h2>
            <p><SiTicktick className='tick-icon'/>Duly filled in application form</p>
            <p><SiTicktick className='tick-icon'/>Quotation of the Tractor from Authorised dealer.</p>
            <p><SiTicktick className='tick-icon'/>Voter ID card/PAN card/Passport/ Aadhaar card/Driving License etc.</p>
            <p><SiTicktick className='tick-icon'/>Proof of agricultural land/ cultivation.</p>
           
          </div>
        );
      case 'interestRate':
        return (
          <div>
            <h2>Interest Rate:</h2>
            <p><SiTicktick className='tick-icon'/>Yr MCLR+3.30%</p>
            <p><SiTicktick className='tick-icon'/>Fees & Charges: Up to 2.00 Lakh-NIL Above 2.00 lakh-1.40% of Loan amount +GST
            </p>
            
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
     <button className='card-section11'>Farm Mechanisation Loan Details</button>
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

export default FarmMechanisationLoanDetailsCard;
