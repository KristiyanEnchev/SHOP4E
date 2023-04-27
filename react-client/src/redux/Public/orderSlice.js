import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as orderService from '../../Services/orderService.js';
import toast from 'react-hot-toast';

export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData) => {
    const response = await orderService.create(orderData);
    return response;
  }
);

export const checkStripeAvailability = createAsyncThunk(
  'orders/checkStripe',
  async () => await orderService.checkStripeStatus()
);

export const getOrders = createAsyncThunk('orders/getOrders', async () => {
  const response = await orderService.getOrders();
  return response;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    setShippingAddress: (state, action) => {
      state.currentOrder = {
        ...state.currentOrder,
        shippingAddress: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        window.location.href = action.payload.url;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        if (action.payload?.serviceDisabled) {
          toast.error('Payment service is temporarily unavailable');
        }
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setShippingAddress } = orderSlice.actions;
export default orderSlice.reducer;
