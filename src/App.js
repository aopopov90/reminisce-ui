import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sessions from './components/Sessions';

const Home = () => (
  <div>
    <h1>Home</h1>
    <p>Welcome to the home page!</p>
  </div>
);

const App = () => (
  <Router>
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sessions" element={<Sessions />} />
      </Routes>
    </div>
  </Router>
);

export default App;
