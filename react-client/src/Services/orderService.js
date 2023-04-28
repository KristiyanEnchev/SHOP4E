import * as api from './apiService.js';

const API_URL = import.meta.env.VITE_HOST_URL;

export const create = async (orderData) => {
  return await api.post(`${API_URL}/api/orders`, orderData);
};

export const getOrders = async () => {
  return await api.get(`${API_URL}/api/orders`);
};

export const checkStripeStatus = async () => {
  const response = await fetch(`${API_URL}/api/orders/stripe-status`);
  if (!response.ok) {
    throw new Error('Failed to check payment service');
  }
  return response.json();
};
