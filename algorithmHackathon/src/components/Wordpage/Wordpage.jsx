import React from 'react';
import { useLocation } from 'react-router-dom';
import TextShow from '../TextShow/TextShow';
import './Wordpage.css';

const Wordpage = () => {
  const location = useLocation();
  
  const { text = null, readState = null, readSpeed = null } = location.state || {};

  console.log('Text:', text);
  console.log('Read State:', readState);
  console.log('Read Speed:', readSpeed);

  return (
    <div className="wordpage">
      <TextShow text={text} readState={readState} readSpeed={readSpeed}/>
    </div>
  );
};

export default Wordpage;
