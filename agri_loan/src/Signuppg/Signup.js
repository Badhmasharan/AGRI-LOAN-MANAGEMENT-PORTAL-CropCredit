import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import LoadingScreen from '../loadingscreen/LoadingScreen'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { VscEye } from "react-icons/vsc";
import { FaUser } from "react-icons/fa6";
import { ImPhone } from "react-icons/im";
import { v4 as uuidv4 } from 'uuid';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessImage, setShowSuccessImage] = useState(false);

  // const generateUniqueUserId = async () => {
  //   let isUnique = false;
  //   let userId;
  
  //   while (!isUnique) {
  //     userId = Math.floor(100000 + Math.random() * 900000).toString();
  //     const response = await axios.get(`http://localhost:8080/users/${userId}`);
  //     isUnique = response.data.length === 0;
  //   }
  
  //   return userId;
  // };
  
  const handleRegister = async () => {
    try {
      setLoading(true);
      setMessage('');
  
      if (!username || !email || !password || !phonenumber || !confirmPassword) {
        setMessage('Please fill in all fields');
        setLoading(false);
        return;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setMessage('Please provide a valid email address');
        setLoading(false);
        return;
      }
  
      if (password !== confirmPassword) {
        setMessage('Passwords do not match');
        setLoading(false);
        return;
      }
  
      if (!/^\d{10}$/.test(phonenumber)) {
        setMessage('Phone number must be 10 digits');
        setLoading(false);
        return;
      }
  
      const response = await axios.get(`http://localhost:8080/user/isUserPresentByEmail?email=${email}`);
      // const existingUser = response.data[0];
  
      if (!response) {
        setMessage('Account already exists');
        setLoading(false);
        return;
      }
  
      // const userId = await generateUniqueUserId();
      const currentDate = new Date();
      const dateOfJoining = currentDate.toISOString().split('T')[0]; // yyyy-mm-dd format
      const timeOfJoining = currentDate.toTimeString().split(' ')[0]; // hh:mm:ss format
  
      const registerResponse = await axios.post('http://localhost:8080/user/addUser', {
        username,
        email,
        password,
        mobileNumber:phonenumber,
        dateOfJoining,
        timeOfJoining
      });
  
      console.log('Registration successful:', registerResponse.data);
      setMessage('Account created successfully');
      setLoading(false);
      setShowSuccessImage(true);
  
      setTimeout(() => {
        setShowSuccessImage(false);
        navigate('/user/login');
      }, 4300);
    } catch (error) {
      console.error('Registration failed:', error.message);
      setMessage('Failed to create account');
      setLoading(false);
    }
  };

  return (
    <div className='loginnn1'>
      <div className='login-container'>
      <div className='login-nav'>
        <div className='login-title-position'>
          <button className='main-button1-login'>
            <img className="icon-plant-login" src="plant.svg" alt="icon"/>
            <h1>Crop<span className="span-title">Credit</span></h1>
          </button>
        </div>
        
      </div>
      <div className="wrapper1">
      <form action="" className='form-class'>
      <div className='head-wrap'>
          <h2>Sign Up</h2>
          </div>
          <div className='fieldss'></div>
          <div className="input-boxx">
          <FaUser icon={faEnvelope} className="input-icon"  />
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i className='bx bxs-user'></i>
          </div>
          <div className="input-boxx">
          <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className='bx bxs-envelope'></i>
          </div>
          <div className="input-boxx3">
          <ImPhone icon={faEnvelope} className="input-icon" />
            <input
              type="text"
              placeholder="Phone Number"
              maxLength="10"
              required
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
            <i className='bx bxs-phone'></i>
          </div>
          <div className="input-boxx1">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className='bx bxs-lock-alt'></i>
          </div>
          <div className="input-boxx2">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <i className='bx bxs-lock-alt'></i>
          </div>
          <div><br /></div>

          <button type="button" className="btnn" onClick={handleRegister}>
            Register
          </button>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
      </div>
      
      {loading && <LoadingScreen />} 
      {showSuccessImage && <LoadingScreen />} 

      <img src='working lady.png' className='lady'></img>
    </div>
  );
};

export default Register;
