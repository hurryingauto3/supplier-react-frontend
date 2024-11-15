import React, { useEffect, useState } from 'react';
import { getStores, getProducts, getSuppliers, getStoreProducts, assignProductToStore } from '../api';

const AssignProducts = () => {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [storeProducts, setStoreProducts] = useState([]);

  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedSizes, setSelectedSizes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const storesData = await getStores();
    const productsData = await getProducts();
    const suppliersData = await getSuppliers();
    const storeProductsData = await getStoreProducts();

    setStores(storesData.data);
    setProducts(productsData.data);
    setSuppliers(suppliersData.data);
    setStoreProducts(storeProductsData.data);
  };

  // Handle assigning a product to a store
  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedSupplier || !selectedStore || !selectedProduct || selectedSizes.length === 0) {
      alert("Please fill out all fields.");
      return;
    }

    await assignProductToStore({
      supplier_id: selectedSupplier,
      store_id: selectedStore,
      product_id: selectedProduct,
      sizes: selectedSizes
    });

    // Reset form
    setSelectedSupplier('');
    setSelectedStore('');
    setSelectedProduct('');
    setSelectedSizes([]);
    fetchData();
  };

  // Toggle size selection
  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  return (
    <div className="container">
      <h2>Assign Products to Stores</h2>
      <form onSubmit={handleAssign} className="assign-form">
        {/* Supplier Selection */}
        <select value={selectedSupplier} onChange={(e) => setSelectedSupplier(e.target.value)} required>
          <option value="">Select Supplier</option>
          {suppliers.map(supplier => (
            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
          ))}
        </select>

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
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>

        {/* Sizes Selection */}
        <div className="sizes-selection">
          {[...Array(10).keys()].map(i => {
            const size = (i + 1).toString();
            return (
              <button
                type="button"
                key={size}
                className={`size-button ${selectedSizes.includes(size) ? 'selected' : ''}`}
                onClick={() => toggleSize(size)}
              >
                {size}
              </button>
            );
          })}
        </div>

        <button type="submit">Assign Product</button>
      </form>

      <h2>Assigned Products</h2>
      <table className="supplier-table">
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Store</th>
            <th>Product</th>
            <th>Sizes</th>
          </tr>
        </thead>
        <tbody>
          {storeProducts.length > 0 ? (
            storeProducts.map(sp => (
              <tr key={sp.id}>
                <td>{sp.supplier_name}</td>
                <td>{sp.store_name}</td>
                <td>{sp.product_name}</td>
                <td>{sp.sizes.join(', ')}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>No assignments found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignProducts;
