import React from 'react';
import Lottie from 'react-lottie';
import Added from './added.json'; 
import './LoadingScreen.css';
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: Added,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const LoadingScreenAdded = () => {
  return (
    <div className="dropdown-menu1">
      <div className="loading-title">
        <h2></h2>
      </div>
      <div className="loading-animation">
        <Lottie options={defaultOptions} height={600} width={500} />
      </div>
    </div>
  );
};

export default LoadingScreenAdded;
