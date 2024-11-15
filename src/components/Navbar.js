import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link> | 
    <Link to="/suppliers">Suppliers</Link> | 
    <Link to="/stores">Stores</Link> | 
    <Link to="/products">Products</Link> | 
    <Link to="/assign">Assign Products</Link> | 
    <Link to="/reports">Reports</Link>
  </nav>
);

export default Navbar;
