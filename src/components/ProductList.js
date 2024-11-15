import React, { useEffect, useState } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products data from the API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    }
  };

  // Handle form submission to add or update a product
  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      if (editMode && selectedProduct) {
        await updateProduct(selectedProduct.id, name);
        setSuccessMessage(`Product "${name}" updated successfully`);
      } else {
        await addProduct(name);
        setSuccessMessage(`Product "${name}" added successfully`);
      }
      setName('');
      setEditMode(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (err) {
      setError(editMode ? "Failed to update product" : "Failed to add product");
      console.error(err);
    }
  };

  // Handle editing a product
  const handleEdit = (product) => {
    setEditMode(true);
    setName(product.name);
    setSelectedProduct(product);
  };

  // Handle deleting a product
  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      setSuccessMessage("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      setError("Failed to delete product");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Products Management</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Flex container for table and form */}
      <div className="supplier-flex">
        {/* Product List Table */}
        <div className="supplier-table-container">
          <table className="supplier-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Created At</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{new Date(product.created_at).toLocaleString()}</td>
                    <td>{new Date(product.updated_at).toLocaleString()}</td>
                    <td>
                      <button onClick={() => handleEdit(product)}>Edit</button>
                      <span> | </span>
                      <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Product Form */}
        <div className="supplier-form-container">
          <form onSubmit={handleAddOrUpdateProduct}>
            <h3>{editMode ? "Edit Product" : "Add New Product"}</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Product Name"
              required
            />
            <button type="submit">{editMode ? "Update Product" : "Add Product"}</button>
            {editMode && (
              <button type="button" onClick={() => {
                setEditMode(false);
                setName('');
                setSelectedProduct(null);
              }}>Cancel</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
