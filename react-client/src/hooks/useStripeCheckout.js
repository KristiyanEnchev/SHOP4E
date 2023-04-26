import { useState } from 'react';

const API_URL = import.meta.env.VITE_HOST_URL;

export const useStripeCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async (items) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const session = await response.json();
      window.location.href = session.url;
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCheckout, isLoading };
};
