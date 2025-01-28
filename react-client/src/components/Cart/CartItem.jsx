import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import {
  removeItem,
  increase,
  decrease,
} from '../../redux/Public/cartSlice.js';

export const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { image, name, price, amount } = item;

  const handleDecrease = () => {
    if (amount <= 1) {
      dispatch(removeItem(item._id));
    } else {
      dispatch(decrease(item._id));
    }
  };

  return (
    <div
      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100
      transition-colors duration-200"
    >
      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-2"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <h4 className="text-sm font-medium text-gray-900 truncate">{name}</h4>
          <button
            onClick={() => dispatch(removeItem(item._id))}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
          >
            <TiDeleteOutline className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-2 flex justify-between items-end">
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200">
            <button
              onClick={handleDecrease}
              className="p-1 hover:bg-gray-100 rounded-l-lg transition-colors"
            >
              <AiOutlineMinus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-medium text-sm">
              {amount}
            </span>
            <button
              onClick={() => dispatch(increase(item._id))}
              className="p-1 hover:bg-gray-100 rounded-r-lg transition-colors"
            >
              <AiOutlinePlus className="w-4 h-4" />
            </button>
          </div>
          <p className="text-base font-bold text-gray-900">${price}</p>
        </div>
      </div>
    </div>
  );
};
