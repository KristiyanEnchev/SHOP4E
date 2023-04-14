import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { clearCart } from '@/redux/Public/cartSlice.js';

const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());

    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#00ff00', '#0000ff'],
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#00ff00', '#0000ff'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Thank you for your order!
        </h1>
        <p className="text-gray-600 mb-6">
          Your order has been processed successfully.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Success;
