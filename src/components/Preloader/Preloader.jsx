import React from 'react';
import './Preloader.css';

const Preloader = ({ text, classNameMod }) => {
  return (
    <div
      className={`preloader ${classNameMod ? `preloader_${classNameMod}` : ''}`}
    >
      <div
        className={`preloader__container ${
          classNameMod ? `preloader__container_${classNameMod}` : ''
        }`}
      >
        <span
          className={`preloader__round ${
            classNameMod ? `preloader__round_${classNameMod}` : ''
          }`}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default Preloader;
