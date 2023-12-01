// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Wordpage from './components/Wordpage/Wordpage';
import Sentence from './components/Sentence/Sentence';
import Resultpage from './components/Resultpage/Resultpage';
import './App.css';
import logo from './logo.png';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">
                  <img src={logo} alt="Logo" className="logo" />
                  <span className="gom">GOM</span> <span className="slayer">SLAYER</span>
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wordpage" element={<Wordpage />} />
            <Route path="/sentence" element={<Sentence />} />
            <Route path="/resultpage" element={<Resultpage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
