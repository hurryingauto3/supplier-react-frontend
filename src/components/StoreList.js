import React, { useEffect, useState } from 'react';
import { getStores, addStore, updateStore, deleteStore } from '../api';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  // Fetch stores data from the API
  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await getStores();
      setStores(response.data);
    } catch (err) {
      setError("Failed to fetch stores");
      console.error(err);
    }
  };

  // Handle form submission to add or update a store
  const handleAddOrUpdateStore = async (e) => {
    e.preventDefault();
    try {
      if (editMode && selectedStore) {
        await updateStore(selectedStore.id, name);
        setSuccessMessage(`Store "${name}" updated successfully`);
      } else {
        await addStore(name);
        setSuccessMessage(`Store "${name}" added successfully`);
      }
      setName('');
      setEditMode(false);
      setSelectedStore(null);
      fetchStores();
    } catch (err) {
      setError(editMode ? "Failed to update store" : "Failed to add store");
      console.error(err);
    }
  };

  // Handle editing a store
  const handleEdit = (store) => {
    setEditMode(true);
    setName(store.name);
    setSelectedStore(store);
  };

  // Handle deleting a store
  const handleDelete = async (storeId) => {
    try {
      await deleteStore(storeId);
      setSuccessMessage("Store deleted successfully");
      fetchStores();
    } catch (err) {
      setError("Failed to delete store");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Stores Management</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Flex container for table and form */}
      <div className="supplier-flex">
        {/* Store List Table */}
        <div className="supplier-table-container">
          <table className="supplier-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Store Name</th>
                <th>Created At</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stores.length > 0 ? (
                stores.map((store) => (
                  <tr key={store.id}>
                    <td>{store.id}</td>
                    <td>{store.name}</td>
                    <td>{new Date(store.created_at).toLocaleString()}</td>
                    <td>{new Date(store.updated_at).toLocaleString()}</td>
                    <td>
                      <button onClick={() => handleEdit(store)}>Edit</button>
                      <span> | </span>
                      <button onClick={() => handleDelete(store.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>No stores found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Store Form */}
        <div className="supplier-form-container">
          <form onSubmit={handleAddOrUpdateStore}>
            <h3>{editMode ? "Edit Store" : "Add New Store"}</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Store Name"
              required
            />
            <button type="submit">{editMode ? "Update Store" : "Add Store"}</button>
            {editMode && (
              <button type="button" onClick={() => {
                setEditMode(false);
                setName('');
                setSelectedStore(null);
              }}>Cancel</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoreList;
