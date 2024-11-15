import React, { useEffect, useState } from 'react';
import { getStores, getProducts, getSalesReport } from '../api';

const ReportGenerator = () => {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState('');
  const [product, setProduct] = useState('');
  const [size, setSize] = useState('');
  const [report, setReport] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch stores and products on component mount
  useEffect(() => {
    fetchStoresAndProducts();
  }, []);

  const fetchStoresAndProducts = async () => {
    try {
      const storesData = await getStores();
      const productsData = await getProducts();
      setStores(storesData.data);
      setProducts(productsData.data);
    } catch (error) {
      console.error("Error fetching stores/products:", error);
      setErrorMessage("Failed to load stores and products");
    }
  };

  // Fetch the report based on selected filters
  const fetchReport = async () => {
    try {
      const response = await getSalesReport({ store, product, size });
      setReport(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error("Error fetching report:", error);
      setErrorMessage("Failed to fetch report");
    }
  };

  return (
    <div className="container">
      <h2>Generate Sales Report</h2>

      <div className="filter-form">
        {/* Store Filter */}
        <select value={store} onChange={(e) => setStore(e.target.value)}>
          <option value="">Select Store</option>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>{store.name}</option>
          ))}
        </select>

        {/* Product Filter */}
        <select value={product} onChange={(e) => setProduct(e.target.value)}>
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>

        {/* Size Filter */}
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="">Select Size</option>
          {[...Array(10).keys()].map((i) => (
            <option key={i + 1} value={(i + 1).toString()}>{i + 1}</option>
          ))}
        </select>

        <button onClick={fetchReport}>Get Report</button>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <h3>Report Results</h3>
      {report.length > 0 ? (
        <table className="report-table">
          <thead>
            <tr>
              <th>Store</th>
              <th>Product</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Sale Date</th>
            </tr>
          </thead>
          <tbody>
            {report.map((item, index) => (
              <tr key={index}>
                <td>{item.store_name}</td>
                <td>{item.product_name}</td>
                <td>{item.size}</td>
                <td>{item.quantity}</td>
                <td>{new Date(item.sale_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default ReportGenerator;
