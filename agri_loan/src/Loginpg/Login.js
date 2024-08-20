import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { VscEye } from "react-icons/vsc";
import { RiEyeCloseLine } from "react-icons/ri";
import { useReactFlow } from 'react-flow-renderer';

const Loginpg = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPassword = localStorage.getItem('rememberedPassword');
    const storedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (storedRememberMe && storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!email || !password) {
      alert("Please provide both email and password");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please provide a valid email address");
      return;
    }
  
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
      localStorage.setItem('rememberedPassword', password);
      localStorage.setItem('rememberMe', true);
    } else {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
      localStorage.removeItem('rememberMe');
    }
  
    try {
      setTimeout( async() => {
        const userResponse = await axios.get(`http://localhost:8080/user/isUserPresent/${email}/${password}`);
        // console.log(userResponse.data);
      
        if (userResponse.data) {
          navigate("/");
          const userId = userResponse.data.userId;
          console.log(userId);
      
          await axios.put(`http://localhost:8080/user/updateLoginStatus/${userId}`, { islogin: 1 });
      
        } else {
          alert("User account doesn't exist");
        }
        
      }, 100);
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while processing your request.");
    }
    
  };
  
  const handleLogin = () => {
    axios.post('http://your-api-url/login', { email, password })
      .then((response) => {
        const actualEmail = response.data.email; 
        localStorage.setItem('rememberedEmail', actualEmail);
        localStorage.setItem('rememberedPassword', password);
        localStorage.setItem('rememberMe', true);
        setEmail(actualEmail);
        navigate('/');
      })
      .catch((error) => {
        console.error('Login failed:', error);
      });
  };

  const handlesignup = () => {
    navigate('/signup');
  };

  const handlepass = () => {
    navigate('/forgot');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleAdminLogin = () => {
    navigate('/admin/login');
  };

  return (
    <div className='loginnn'>
      <div className='login-container'>
        <div className='login-nav'>
          <div className='login-title-position'>
            <button className='main-button1-login'>
              <img className="icon-plant-login" src="/plant.svg" alt="icon"/>
              <h1>Crop<span className="span-title">Credit</span></h1>
            </button>
          </div>
        </div>
        <div className='admin-switch'>
          <img src='/popupman.png' className='pop-up-man'></img>
        <button onClick={handleAdminLogin}  className='admin-switch-button'>
        Switch to Admin Login
          </button>
        </div>
        <div className='wrapper-container'>
          <div className="wrapper">
            <form action="" className='form-class'>
              <div className='head-wrap'>
                <h2>{isAdminLogin ? 'ADMIN LOGIN' : 'LOGIN'}</h2>
              </div>
              <div className='fieldss'>
                <div className="input-box">
                  <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={handleEmail}
                  />
                </div>
                <div className="input-box">
                  <FontAwesomeIcon icon={faLock} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={password}
                    onChange={handlePassword}
                  />
                  <button type="button" className="toggle-password" onClick={toggleShowPassword}>
                    {showPassword ? <VscEye /> : <RiEyeCloseLine />}
                  </button>
                </div>
              </div>
              <div><br></br></div>
              <div className="remember-forgot">
                <label>
                  <input
                    type="checkbox"
                    className='checkbox'
                    checked={rememberMe}
                    onChange={handleRememberMe}
                  />
                  Remember me
                </label>
                <a onClick={handlepass}>Forgot Password?</a>
              </div>
              <button type="button" className="btn" onClick={handleSubmit}>
                Login
              </button>
              <div className="register-link">
                <p>Don't have an account?</p> <a onClick={handlesignup}>Register</a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <img src='/working lady.png' className='lady' alt='working lady'></img>
    </div>
  );
};

export default Loginpg;
