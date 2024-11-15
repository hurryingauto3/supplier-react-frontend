import React, { useState } from 'react';
import { addSupplier } from '../api';

const SupplierForm = ({ onAdd }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSupplier(name);
    setName('');
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter supplier name"
      />
      <button type="submit">Add Supplier</button>
    </form>
  );
};

export default SupplierForm;
