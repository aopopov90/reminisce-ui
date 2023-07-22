import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/sessions">Sessions</Link>
      </li>
      {/* Add more navigation links if needed */}
    </ul>
  </nav>
);

export default Navbar;
