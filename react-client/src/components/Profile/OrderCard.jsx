const OrderCard = ({ order }) => {
  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500">Order ID: {order._id}</p>
          <p className="text-sm text-gray-500">
            Date: {formatDate(order.createdAt)}
          </p>
        </div>
        <span
          className="px-3 py-1 rounded-full text-sm capitalize
            {order.status === 'completed' ? 'bg-green-100 text-green-800' :
             order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
             'bg-gray-100 text-gray-800'}"
        >
          {order.status}
        </span>
      </div>

      <div className="space-y-4">
        {order.items.map((item) => (
          <div key={item._id} className="flex gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div>
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              <p className="text-sm font-medium">${item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total:</span>
          <span className="font-bold text-lg">${order.total}</span>
        </div>
      </div>
    </div>
  );
};
export default OrderCard;
