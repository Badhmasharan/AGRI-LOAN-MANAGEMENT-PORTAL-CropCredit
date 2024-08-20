import React, { useState, useEffect } from 'react';
import './ApplicationPage.css';
import Navbar from '../Navbar/Navbbar';
import Footer from '../Footer/Footer';
import SubmissionAnimationPage from './SubmissionAnimationPage';
import SubmissionAnimationOverlay from './SubmissionAnimationPage';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoanApplicationForm = () => {
  const [step, setStep] = useState(1);
  const [submittedApplications, setSubmittedApplications] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessImage, setShowSuccessImage] = useState(false);
  const [formData, setFormData] = useState({
    loanAmount: '',
    annualIncome: '',
    loanType: '', 
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    addressDuration: '',
    occupation: '',
    monthlyIncome: '',
    bankName: '',
    accountNumber: '',
    bankPhone: '',
    authorizeConsent: false,
    agreeStatement: false,
    photoUpload: null,
    aadharUpload: null,
    landCertificateUpload: null,
    submittedAt: '', 
    status: 'Yet to Review', // Default status
    userId: '' // Add userId field
  });
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Fetch user ID from JSON Server
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        setTimeout(async () => {
          const response = await axios.get('http://localhost:8080/user/loggedin'); // Adjust URL as needed
          if (response.data) {
            const users = response.data;
           
            setUserId(users.userId); 
            setFormData(prevData => ({ ...prevData, userId: userId }));
          } else {
            console.error('Failed to fetch user ID');
          }
          
        }, 100);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
    
    fetchUserId();
  }, []);

  const validateStep1 = () => {
    let valid = true;
    const errors = {};

    if (!formData.loanAmount) errors.loanAmount = '*Loan amount is required';
    if (!formData.annualIncome) errors.annualIncome = '*Annual income is required';
    if (!formData.loanType) errors.loanType = '*Loan type is required';
    if (!formData.firstName) errors.firstName = '*First name is required';
    if (!formData.lastName) errors.lastName = '*Last name is required';
    if (!formData.birthDate) errors.birthDate = '*Birth date is required';
    if (!formData.email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) errors.email = '*Valid email is required';
    if (!formData.phone || !/^[6-9]\d{9}$/.test(formData.phone)) errors.phone = '*Valid 10-digit Indian phone number is required';
    if (!formData.addressLine1) errors.addressLine1 = '*Address line 1 is required';
    if (!formData.city) errors.city = '*City is required';
    if (!formData.state) errors.state = '*State is required';
    if (!formData.postalCode) errors.postalCode = '*Postal/Zip code is required';
    if (!formData.addressDuration) errors.addressDuration = '*Address duration is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    let valid = true;
    const errors = {};

    if (!formData.bankName) errors.bankName = '*Bank name is required';
    if (!formData.accountNumber) errors.accountNumber = '*Account number is required';
    if (!formData.cibilScore) errors.cibilScore = '*Cibil Score is required';
    if (formData.cibilScore < 0 || formData.cibilScore > 10) {
      errors.cibilScore = '*CIBIL Score must be between 0 and 10';
    }
  
    if (!formData.bankPhone || !/^[6-9]\d{9}$/.test(formData.bankPhone)) errors.bankPhone = '*Valid 10-digit Indian phone number is required';
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = () => {
    let valid = true;
    const errors = {};

    if (!formData.photoUpload) errors.photoUpload = '*Photo is required';
    if (!formData.aadharUpload) errors.aadharUpload = '*Aadhar card is required';
    if (!formData.authorizeConsent) errors.authorizeConsent = '*Authorization consent is required';
    if (!formData.agreeStatement) errors.agreeStatement = '*Agreement consent is required';
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []); 

  const handlePrevious = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData(prevData => ({
        ...prevData,
        [name]: files[0]
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    if (step === 1 && !validateStep1()) return;
    
    if (step === 2 && !validateStep2()) return;
   
    if (step === 3 && !validateStep3()) return;

    const submissionTime = new Date().toISOString();
    const dataToSubmit = { ...formData, submittedAt: submissionTime };
  
    try {

      // const readFileAsBase64 = (file) => {
      //   return new Promise((resolve, reject) => {
      //     const reader = new FileReader();
      //     reader.onloadend = () => {
      //       resolve(reader.result.split(',')[1]); // Remove the data URL part
      //     };
      //     reader.onerror = reject;
      //     reader.readAsDataURL(file);
      //   });
      // };

      // const photoUploadBase64 = await readFileAsBase64(formData.photoUpload);
      // const aadharUploadBase64 = await readFileAsBase64(formData.aadharUpload);
      // const landCertificateUploadBase64 = await readFileAsBase64(formData.landCertificateUpload);
  

      const dataToSubmit = {
        loanAmount: formData.loanAmount,
        annualIncome: formData.annualIncome,
        loanType: formData.loanType,
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: formData.birthDate,
        email: formData.email,
        phone: formData.phone,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        addressDuration: formData.addressDuration,
        occupation: formData.occupation,
        monthlyIncome: formData.monthlyIncome,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        cibilScore: formData.cibilScore,
        bankPhone: formData.bankPhone,
        authorizeConsent: formData.authorizeConsent,
        agreeStatement: formData.agreeStatement,
        submittedAt: submissionTime,
        user:{
          userId:userId
        }
      };

      console.log(dataToSubmit);

      const response = await axios.post(`http://localhost:8080/data/post`,dataToSubmit);
      console.log(response.data)
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: dataToSubmit,
      // });
  
      // if (!response.ok) {
      //   throw new Error('Network response was not ok.');
      // }

  
      // Show animation
  
      setFormData({
        loanAmount: '',
        annualIncome: '',
        loanType: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        email: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        addressDuration: '',
        occupation: '',
        monthlyIncome: '',
        bankName: '',
        accountNumber: '',
        cibilScore:'',
        bankPhone: '',
        authorizeConsent: false,
        agreeStatement: false,
        photoUpload: null,
        aadharUpload: null,
        landCertificateUpload: null,
        submittedAt: '',
        status: 'Yet to Review', // Ensure status is set to default
         userId: '',
      });


      // Show animation overlay
      setShowAnimation(true);
      
    }  catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  const handleAnimationComplete = () => {
    setShowAnimation(false);
  };

  return (
    <div className='app-form'>
        <Navbar/>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
    <div className="loan-application-form">
      {step === 1 && (
        <div className="form-step">
          <h2>Step 1: Personal and Employment Information</h2>
          <form onSubmit={handleSubmit}>
            <div className='income-container'>
            <fieldset>
              <legend>Desired Loan Amount</legend>
              <input
                type="number"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
                placeholder="$0"
                required
              />
              {errors.loanAmount && <p className="error">{errors.loanAmount}</p>}
            </fieldset>

            <fieldset>
              <legend>Annual Income</legend>
              <input
                type="number"
                name="annualIncome"
                value={formData.annualIncome}
                onChange={handleChange}
                placeholder="0"
                required
              />
              {errors.annualIncome && <p className="error">{errors.annualIncome}</p>}
            </fieldset>
            </div>
            <fieldset>
              <legend>Loan Type</legend>
              <label>
                <input
                  type="radio"
                  name="loanType"
                  value="Crop Loan"
                  checked={formData.loanType === 'Crop Loan'}
                  onChange={handleChange}
                  required
                />
                Crop Loan
              </label>
              <label>
                <input
                  type="radio"
                  name="loanType"
                  value="Digital Gold Loan"
                  checked={formData.loanType === 'Digital Gold Loan'}
                  onChange={handleChange}
                />
                Digital Gold Loan
              </label>
              <label>
                <input
                  type="radio"
                  name="loanType"
                  value="Agri Credit Card"
                  checked={formData.loanType === 'Agri Credit Card'}
                  onChange={handleChange}
                />
                Agri Credit Card
              </label>
              <label>
                <input
                  type="radio"
                  name="loanType"
                  value="Farm Mechanisation Loan"
                  checked={formData.loanType === 'Farm Mechanisation Loan'}
                  onChange={handleChange}
                />
                Farm Mechanisation Loan
              </label>
              {errors.loanType && <p className="error">{errors.loanType}</p>}
            </fieldset>

            <fieldset>
              <legend>Personal Information</legend>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                {errors.firstName && <p className="error">{errors.firstName}</p>}
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                {errors.lastName && <p className="error">{errors.lastName}</p>}
              </label>
              <label>
                Birth Date:
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />
                {errors.birthDate && <p className="error">{errors.birthDate}</p>}
              </label>
            </fieldset>

            <fieldset>
              <legend>Contact Information</legend>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </label>
              <label>
                Phone:
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  required
                />
                {errors.phone && <p className="error">{errors.phone}</p>}
              </label>
            </fieldset>

            <fieldset>
              <legend>Address</legend>
              <label>
                Address Line 1:
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  required
                />
                {errors.addressLine1 && <p className="error">{errors.addressLine1}</p>}
              </label>
              <label>
                Address Line 2:
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                {errors.city && <p className="error">{errors.city}</p>}
              </label>
              <label>
                State:
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
                {errors.state && <p className="error">{errors.state}</p>}
              </label>
              <label>
                Postal Code:
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
                {errors.postalCode && <p className="error">{errors.postalCode}</p>}
              </label>
              <label>
                Duration at Address:
                <input
                  type="text"
                  name="addressDuration"
                  value={formData.addressDuration}
                  onChange={handleChange}
                  required
                />
                {errors.addressDuration && <p className="error">{errors.addressDuration}</p>}
              </label>
            </fieldset>

            <fieldset>
              <legend>Employment Information</legend>
              
              <label>
                Occupation:
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                />
                {errors.occupation && <p className="error">{errors.occupation}</p>}
              </label>
              
              <label>
                Monthly Income:
                <input
                  type="number"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  required
                />
                {errors.monthlyIncome && <p className="error">{errors.monthlyIncome}</p>}
              </label>
              
            
            </fieldset>

            <div className='step-button-split'>
              <button type="button" onClick={handleNext}>Next</button>
            </div>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
          <h2>Step 2: Bank References</h2>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Bank Information</legend>
              <label>
                Bank Name:
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  required
                />
                {errors.bankName && <p className="error">{errors.bankName}</p>}
              </label>
              <label>
                Account Number:
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  required
                />
                {errors.accountNumber && <p className="error">{errors.accountNumber}</p>}
              </label>
              <label>
                Cibil Score:
                <input
                  type="text"
                  name="cibilScore"
                  value={formData.cibilScore}
                  onChange={handleChange}
                  required
                />
                {errors.cibilScore && <p className="error">{errors.cibilScore}</p>}
              </label>
              <label>
                Bank Phone:
                <input
                  type="tel"
                  name="bankPhone"
                  value={formData.bankPhone}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  required
                />
                {errors.bankPhone && <p className="error">{errors.bankPhone}</p>}
              </label>
            </fieldset>

            

            <div className='step-button-split'>
              <button type="button" onClick={handlePrevious}>Previous</button>
              <button type="button" onClick={handleNext}>Next</button>
            </div>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className="form-step">
          <h2>Step 3: Document Upload</h2>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Upload Documents</legend>
              <label>
                Upload Photo:
                <input
                  type="file"
                  name="photoUpload"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Upload Aadhar:
                <input
                  type="file"
                  name="aadharUpload"
                  accept="immage/pdf"
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Upload Land Certificate:
                <input
                  type="file"
                  name="landCertificateUpload"
                  accept="image/*/pdf"
                  onChange={handleChange}
                  required
                />
              </label>
            </fieldset>
            <fieldset>
              <legend>Authorization</legend>
              <label>
                <input
                  type="checkbox"
                  name="authorizeConsent"
                  checked={formData.authorizeConsent}
                  onChange={handleChange}
                  required
                />
                I authorize the bank to verify the information provided in this application.
              </label>
              {errors.authorizeConsent && <p className="error">{errors.authorizeConsent}</p>}
              <label>
                <input
                  type="checkbox"
                  name="agreeStatement"
                  checked={formData.agreeStatement}
                  onChange={handleChange}
                  required
                />
                I agree to the terms and conditions.
              </label>
              {errors.agreeStatement && <p className="error">{errors.agreeStatement}</p>}
            </fieldset>

            <div className='step-button-split'>
              <button type="button" onClick={handlePrevious}>Previous</button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
    <Footer/>
    {showAnimation && (
        <SubmissionAnimationOverlay onComplete={handleAnimationComplete} />
      )}

    </div>
  );
};

export default LoanApplicationForm;
