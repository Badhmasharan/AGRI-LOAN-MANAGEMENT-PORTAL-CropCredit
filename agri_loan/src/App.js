import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loginpg from './Loginpg/Login';
import Register from './Signuppg/Signup';
import Navbbar from './Navbar/Navbbar';
import Home from './Home/Home';
import Footer from './Footer/Footer';
import MyApplications from './Application/MyApplications';
import LoanApplicationForm from './Application/ApplicationPage';
import AdminLogin from './Adminportal/Loginpage/AdminLogin';

import Adminportal from './Adminportal/Adminportal';
import LoanApplications from './Adminportal/components/LoanApplications';
import Users from './Adminportal/components/Users';
import Contact from './Contact/Contact';
import RepaymentTracking from './Adminportal/components/RepaymentTracking';
import LoanTracking from './Application/LoanTracking';

import SubmissionAnimationOverlay from './Application/SubmissionAnimationPage';
import PaymentPage from './Application/PaymentPage';


function App() {
  const [submittedApplications, setSubmittedApplications] = useState([]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path='/user/login' element={<Loginpg />} />
          <Route path='/' element={<Home />} />
          <Route path='/admin/home' element={<Adminportal />} />
          <Route path='/Signup' element={<Register />} />
          <Route path='/Navbar' element={<Navbbar />} />
          <Route path='/Footer' element={<Footer />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<Adminportal />} />
          <Route path='/admin/LoanApplications' element={<LoanApplications />} />
          <Route path='/admin/repaymentTracking' element={<RepaymentTracking />} />
          <Route path='/admin/Users' element={<Users />} />
          <Route path="/submission-animation" element={<SubmissionAnimationOverlay />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route
            path="/apply"
            element={<LoanApplicationForm setSubmittedApplications={setSubmittedApplications} />}
          />
          <Route
            path="/my-applications"
            element={<MyApplications applications={submittedApplications} />}
          />
          <Route path='/user/loan/tracking' element={<LoanTracking />} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
