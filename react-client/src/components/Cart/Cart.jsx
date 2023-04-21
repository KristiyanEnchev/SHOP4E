import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import { CartItem } from './CartItem.jsx';
import { closeModal } from '../../redux/Public/modalSlice.js';
import { clearCart } from '../../redux/Public/cartSlice.js';
import { UserActions } from '../../Admin/components/Helpers/UserListConstants.js';
import { Button } from '../ui/button.jsx';
import toast from 'react-hot-toast';
import { checkStripeAvailability } from '@/redux/Public/orderSlice.js';

const Cart = () => {
  const cartRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, total, amount } = useSelector((store) => store.cart);
  const { isOpen, userAction } = useSelector((state) => state.modal);

  const isCartOpen = isOpen && userAction === UserActions.OpenCart;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        dispatch(closeModal());
      }
    };

    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen, dispatch]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleClear = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  const handleProceedToCheckout = async () => {
    const result = await dispatch(checkStripeAvailability()).unwrap();
    if (!result.stripeEnabled) {
      toast.error('Payment service is currently unavailable');
      return;
    }
    navigate('/shipping');
    dispatch(closeModal());
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Cart */}
      <div
        className={`fixed top-0 right-0 w-full md:w-[480px] h-screen bg-white shadow-2xl
          transform transition-transform duration-300 ease-in-out ${
            isCartOpen ? 'translate-x-0 z-50' : 'translate-x-full'
          }`}
        ref={cartRef}
      >
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <button
              className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors"
              onClick={handleClose}
            >
              <AiOutlineLeft className="w-5 h-5" />
              <span className="text-lg">Your Cart</span>
              <span className="text-sm text-gray-500">({amount} items)</span>
            </button>
            {cartItems.length > 0 && (
              <button
                onClick={handleClear}
                className="text-red-500 hover:text-red-600 text-sm transition-colors"
              >
                Clear Cart
              </button>
            )}
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length < 1 ? (
              <div className="flex flex-col items-center justify-center h-full p-6">
                <AiOutlineShopping className="w-24 h-24 text-gray-300 mb-6" />
                <h3 className="text-xl font-medium text-gray-900 mb-4">
                  Your shopping bag is empty
                </h3>
                <Link to="/">
                  <button
                    onClick={() => dispatch(closeModal())}
                    className="px-8 py-3 bg-red-500 text-white rounded-full
                      hover:bg-red-600 transition-colors font-medium"
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {cartItems.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length >= 1 && (
            <div className="border-t border-gray-200 p-6 bg-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base text-gray-500">Subtotal:</h3>
                <h3 className="text-2xl font-bold text-gray-900">${total}</h3>
              </div>
              <Button
                onClick={handleProceedToCheckout}
                className="w-full h-11 bg-gradient-to-r from-red-400 to-red-500 hover:opacity-90
                    transition-all shadow-lg shadow-red-500/30 text-white font-semibold text-base rounded-full"
                disabled={!cartItems.length}
              >
                {cartItems.length
                  ? 'Proceed to Checkout'
                  : 'Your cart is empty'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
