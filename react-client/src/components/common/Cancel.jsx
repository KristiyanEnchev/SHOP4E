import { Link } from 'react-router-dom';

const Cancel = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Order canceled</h1>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-red-500 text-white rounded-full"
      >
        Continue Shopping
      </Link>
    </div>
  </div>
);

export default Cancel;
