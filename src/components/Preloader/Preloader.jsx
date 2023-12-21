import React from 'react';
import './Preloader.css';

const Preloader = ({ text, className }) => {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <span className={`preloader__${className ? className : 'round'}`}>
          {text}
        </span>
      </div>
    </div>
  );
};

export default Preloader;
