import React, { useState } from 'react';
import { addStore } from '../api';

const StoreForm = () => {
  const [name, setName] = useState('');

  const handleAddStore = async (e) => {
    e.preventDefault();
    await addStore(name);
    setName('');
  };

  return (
    <form onSubmit={handleAddStore}>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Store Name" 
      />
      <button type="submit">Add Store</button>
    </form>
  );
};

export default StoreForm;
