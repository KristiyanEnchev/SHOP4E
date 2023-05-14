import * as api from './apiService.js';

const host = (api.settings.host = 'http://localhost:5000/api');

export const create = async (orderData) => {
  return await api.post(`${host}/orders`, orderData);
};

export const getOrders = async () => {
  return await api.get(`${host}/orders`);
};

export const checkStripeStatus = async () => {
  const response = await fetch(`${host}/orders/stripe-status`);
  if (!response.ok) {
    throw new Error('Failed to check payment service');
  }
  return response.json();
};
