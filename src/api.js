import axios from 'axios';

const API_URL = 'https://supplier-flask-app-cxdybue9gufgbqbp.australiaeast-01.azurewebsites.net';

// Suppliers API
export const getSuppliers = async () => axios.get(`${API_URL}/suppliers`);
export const addSupplier = async (name) => axios.post(`${API_URL}/suppliers`, { name });
export const updateSupplier = async (id, name) => axios.put(`${API_URL}/suppliers`, { id, name });
export const deleteSupplier = async (id) => axios.delete(`${API_URL}/suppliers`, { data: { id } });

// Stores
export const getStores = async () => axios.get(`${API_URL}/stores`);
export const addStore = async (name) => axios.post(`${API_URL}/stores`, { name });
export const updateStore = async (id, name) => axios.put(`${API_URL}/stores`, { id, name });
export const deleteStore = async (id) => axios.delete(`${API_URL}/stores`, { data: { id } });

// Products
export const getProducts = async () => axios.get(`${API_URL}/products`);
export const addProduct = async (name) => axios.post(`${API_URL}/products`, { name });
export const updateProduct = async (id, name) => axios.put(`${API_URL}/products`, { id, name });
export const deleteProduct = async (id) => axios.delete(`${API_URL}/products`, { data: { id } });

// Assign Products to Stores
export const getStoreProducts = async () => axios.get(`${API_URL}/store-products`);
export const assignProductToStore = async (data) => axios.post(`${API_URL}/assign-product`, data);

// Record a sale
export const postSale = async (data) => axios.post(`${API_URL}/sales`, data);
export const getSalesReport = async (filters) => axios.post(`${API_URL}/sales-report`, filters);
