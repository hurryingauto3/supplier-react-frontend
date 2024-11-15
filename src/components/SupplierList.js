import React, { useEffect, useState } from 'react';
import { getSuppliers, addSupplier, updateSupplier, deleteSupplier } from '../api';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // Fetch suppliers data from the API
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await getSuppliers();
      setSuppliers(response.data);
    } catch (err) {
      setError("Failed to fetch suppliers");
      console.error(err);
    }
  };

  // Handle form submission to add or update a supplier
  const handleAddOrUpdateSupplier = async (e) => {
    e.preventDefault();
    try {
      if (editMode && selectedSupplier) {
        await updateSupplier(selectedSupplier.id, name);
        setSuccessMessage(`Supplier "${name}" updated successfully`);
      } else {
        await addSupplier(name);
        setSuccessMessage(`Supplier "${name}" added successfully`);
      }
      setName('');
      setEditMode(false);
      setSelectedSupplier(null);
      fetchSuppliers();
    } catch (err) {
      setError(editMode ? "Failed to update supplier" : "Failed to add supplier");
      console.error(err);
    }
  };

  // Handle editing a supplier
  const handleEdit = (supplier) => {
    setEditMode(true);
    setName(supplier.name);
    setSelectedSupplier(supplier);
  };

  // Handle deleting a supplier
  const handleDelete = async (supplierId) => {
    try {
      await deleteSupplier(supplierId);
      setSuccessMessage("Supplier deleted successfully");
      fetchSuppliers();
    } catch (err) {
      setError("Failed to delete supplier");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Suppliers Management</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Flex container for table and form */}
      <div className="supplier-flex">
        {/* Supplier List Table */}
        <div className="supplier-table-container">
          <table className="supplier-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Supplier Name</th>
                <th>Created At</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length > 0 ? (
                suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.id}</td>
                    <td>{supplier.name}</td>
                    <td>{new Date(supplier.created_at).toLocaleString()}</td>
                    <td>{new Date(supplier.updated_at).toLocaleString()}</td>
                    <td>
                      <button onClick={() => handleEdit(supplier)}>Edit</button>
                      <span> | </span>
                      <button onClick={() => handleDelete(supplier.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>No suppliers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Supplier Form */}
        <div className="supplier-form-container">
          <form onSubmit={handleAddOrUpdateSupplier}>
            <h3>{editMode ? "Edit Supplier" : "Add New Supplier"}</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Supplier Name"
              required
            />
            <button type="submit">{editMode ? "Update Supplier" : "Add Supplier"}</button>
            {editMode && (
              <button type="button" onClick={() => {
                setEditMode(false);
                setName('');
                setSelectedSupplier(null);
              }}>Cancel</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupplierList;
