import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calculator from './components/Calculator';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Calculator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
