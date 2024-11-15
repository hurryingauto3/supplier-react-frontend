import React, { useEffect, useState } from 'react';
import { getStores, getProducts, getStoreProducts, postSale } from '../api';

const RecordSales = () => {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [storeProducts, setStoreProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);

  const [selectedStore, setSelectedStore] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch stores, products, and store-product assignments on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const storesData = await getStores();
    const productsData = await getProducts();
    const storeProductsData = await getStoreProducts();

    setStores(storesData.data);
    setProducts(productsData.data);
    setStoreProducts(storeProductsData.data);
  };

  // Update the product list based on the selected store
  useEffect(() => {
    if (selectedStore) {
      const availableProducts = storeProducts
        .filter(sp => sp.store_id === parseInt(selectedStore))
        .map(sp => ({
          id: sp.product_id,
          name: sp.product_name
        }));
      setFilteredProducts(availableProducts);
      setAvailableSizes([]);
      setSelectedProduct('');
      setSelectedSize('');
    } else {
      setFilteredProducts([]);
    }
  }, [selectedStore, storeProducts]);

  // Update the sizes list based on the selected product
  useEffect(() => {
    if (selectedProduct) {
      const productSizes = storeProducts.find(
        sp => sp.store_id === parseInt(selectedStore) && sp.product_id === parseInt(selectedProduct)
      );
      setAvailableSizes(productSizes ? productSizes.sizes : []);
      setSelectedSize('');
    } else {
      setAvailableSizes([]);
    }
  }, [selectedProduct, storeProducts, selectedStore]);

  // Handle form submission to record a sale
  const handleRecordSale = async (e) => {
    e.preventDefault();

    if (!selectedStore || !selectedProduct || !selectedSize || !quantity) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    try {
      await postSale({
        store_id: selectedStore,
        product_id: selectedProduct,
        size: selectedSize,
        quantity: parseInt(quantity)
      });

      setSuccessMessage("Sale recorded successfully!");
      setErrorMessage('');
      setSelectedStore('');
      setSelectedProduct('');
      setSelectedSize('');
      setQuantity('');
    } catch (error) {
      console.error("Error recording sale:", error);
      setErrorMessage("Failed to record sale.");
      setSuccessMessage('');
    }
  };

  return (
    <div className="container">
      <h2>Record a Sale</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleRecordSale} className="sales-form">
        {/* Store Selection */}
        <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)} required>
          <option value="">Select Store</option>
          {stores.map(store => (
            <option key={store.id} value={store.id}>{store.name}</option>
          ))}
        </select>

        {/* Product Selection */}
        <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)} required>
          <option value="">Select Product</option>
          {filteredProducts.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>

        {/* Size Selection */}
        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} required>
          <option value="">Select Size</option>
          {availableSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>

        {/* Quantity Input */}
        <input
          type="number"
          placeholder="Enter Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          required
        />

        <button type="submit">Record Sale</button>
      </form>
    </div>
  );
};

export default RecordSales;
