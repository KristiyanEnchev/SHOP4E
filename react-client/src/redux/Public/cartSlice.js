import { createSlice } from '@reduxjs/toolkit';

const getLocalStorage = (name) => {
  if (typeof window !== 'undefined') {
    const storage = localStorage.getItem(name);

    if (storage) return JSON.parse(localStorage.getItem(name));

    if (name === 'cartItems') return [];

    return 0;
  }
};

const initialState = {
  cartItems: getLocalStorage('cartItems'),
  amount: getLocalStorage('amount'),
  total: getLocalStorage('total'),
  isLoading: true,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload.product._id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].amount += action.payload.amount;
      } else {
        const item = {
          ...action.payload.product,
          amount: action.payload.amount,
        };
        state.cartItems.push(item);
      }
    },
    clearCart: (state) => {
      localStorage.removeItem('cartItems');
      localStorage.removeItem('total');
      localStorage.removeItem('amount');
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== itemId);
    },
    increase: (state, { payload }) => {
      state.cartItems = state.cartItems.map((product) =>
        product._id === payload
          ? { ...product, amount: product.amount + 1 }
          : product
      );
    },
    decrease: (state, { payload }) => {
      state.cartItems = state.cartItems.map((product) =>
        product._id === payload
          ? { ...product, amount: product.amount - 1 }
          : product
      );
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('total', JSON.stringify(total));
      localStorage.setItem('amount', JSON.stringify(amount));
    },
  },
});

export const selectCartItems = (state) => state.cart.cartItems;

export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
  addToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
