import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productService from '../../Services/productService.js';

const initialState = {
  loading: false,
  error: null,
  product: {},
};

export const getProductBySlug = createAsyncThunk(
  'product/:slug',
  async (slug) => {
    const res = await productService.getProductBySlug(slug);
    return res;
  }
);

export const getProductById = createAsyncThunk(
  'product/:productId',
  async (productId) => {
    const res = await productService.getProductById(productId);
    return res;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    incrementProductAmount: (state, action) => {
      return {
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, amount: product.amount + 1 }
            : product
        ),
      };
    },
    decrementProductAmount: (state, action) => {
      return {
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, amount: product.amount - 1 }
            : product
        ),
      };
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers: {
    [getProductBySlug.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getProductBySlug.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.product = payload;
    },
    [getProductBySlug.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [getProductById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getProductById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.product = payload;
    },
    [getProductById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { decrementProductAmount, incrementProductAmount, setProduct } =
  productSlice.actions;

export default productSlice.reducer;

export const selectProduct = (state) => state?.product.product;
