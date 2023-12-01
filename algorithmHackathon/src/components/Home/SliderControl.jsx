// SliderControl.jsx
import React, { useState } from 'react';
import './SliderControl.css';

const SliderControl = ({ value, onChange }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseOver = () => {
    setShowTooltip(true);
  };

  const handleMouseOut = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <div className="slider-container">
        <input
          type="range"
          id="slider"
          min="100"
          max="400"
          value={value}
          onChange={onChange}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
        {showTooltip && (
          <div className="tooltip">
            {value}
          </div>
        )}
      </div>
    </>
  );
};

export default SliderControl;
