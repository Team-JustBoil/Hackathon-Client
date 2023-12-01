// src/components/About.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const Sentence = () => {
    const location = useLocation();

    const { text = null, readState = null, readSpeed = null } = location.state || {};

    console.log('Text:', text);
    console.log('Read State:', readState);
    console.log('Read Speed:', readSpeed);

  return (
    <div className="page">
      <h2>Sentence</h2>
      <p>Learn more about us.</p>
    </div>
  );
};

export default Sentence;
