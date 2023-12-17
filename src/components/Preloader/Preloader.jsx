import React from 'react';
import './Preloader.css';

const Preloader = ({ text }) => {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <span className="preloader__round">{text}</span>
      </div>
    </div>
  );
};

export default Preloader;
