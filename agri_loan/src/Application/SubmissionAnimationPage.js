import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import loadingImage from './submitted.json'; 
import './SubmissionAnimationPage.css';
const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: loadingImage,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const SubmissionAnimationOverlay = ({ onComplete }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect after 4 seconds
    const timer = setTimeout(() => {
      onComplete(); // Trigger the onComplete callback to hide the animation
      navigate('/my-applications');
    }, 4000); // 4 seconds delay

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [navigate, onComplete]);

  return (
    <div className="submission-animation-overlay">
      
        <Lottie options={defaultOptions} height={500} width={500} />
   
    </div>
  );
};

export default SubmissionAnimationOverlay;
