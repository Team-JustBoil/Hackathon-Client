// src/components/About.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import TextShow from '../TextShow/TextShow';
import './Sentence.css';

const Sentence = () => {
    const location = useLocation();

    const { text = null, readState = null, readSpeed = null } = location.state || {};

    console.log('Text:', text);
    console.log('Read State:', readState);
    console.log('Read Speed:', readSpeed);

  return (
    <div className="sentence">
      <TextShow text={text} readState={readState} readSpeed={readSpeed}/>
    </div>
  );
};

export default Sentence;