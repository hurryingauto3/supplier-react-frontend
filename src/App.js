import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SupplierList from './components/SupplierList';
import SupplierForm from './components/SupplierForm';
import StoreList from './components/StoreList';
import StoreForm from './components/StoreForm';
import ProductList from './components/ProductList';
import AssignProducts from './components/AssignProducts';
import ReportGenerator from './components/ReportGenerator';
import RecordSales from './components/RecordSales';
import './styles.css';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<RecordSales />} />
      <Route path="/suppliers" element={<SupplierList />} />
      <Route path="/add-supplier" element={<SupplierForm />} />
      <Route path="/stores" element={<StoreList />} />
      <Route path="/add-store" element={<StoreForm />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/assign" element={<AssignProducts />} />
      <Route path="/reports" element={<ReportGenerator />} />
    </Routes>
  </Router>
);

export default App;
