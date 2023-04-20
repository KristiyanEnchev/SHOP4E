import { useEffect } from 'react';
import Loader from '../common/Loader/Loader.jsx';
import { getOrders } from '@/redux/Public/orderSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import OrderCard from './OrderCard.jsx';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  if (loading) return <Loader />;

  console.log(orders);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
