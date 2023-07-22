import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BasicMenu from './components/BasicMenu';
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
      <BasicMenu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sessions" element={<Sessions />} />
      </Routes>
    </div>
  </Router>
);

export default App;
