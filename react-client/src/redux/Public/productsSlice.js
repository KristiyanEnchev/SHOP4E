import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import * as productService from '../../Services/productService.js';
import { getError } from '../../utils/utils.js';

const initialState = {
  loading: false,
  error: null,
  products: [],
};

export const getProducts = createAsyncThunk('products', async () => {
  const res = await productService.getProducts();
  return res;
});
export const createProduct = createAsyncThunk(
  'products/create',
  async (product) => {
    const res = await productService.create(product);
    return res;
  }
);
export const updateProduct = createAsyncThunk(
  'products/update',
  async (data) => {
    const res = await productService.edit(data._id, data);
    return res.product;
  }
);

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await productService.deleteRequest(id);
  return id;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.products = payload;
    },
    [getProducts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [createProduct.pending]: (state) => {
      state.loading = true;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
      toast.success('Successfuly created product');
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      toast.error(getError(action.error));
    },

    [updateProduct.pending]: (state) => {
      state.loading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      state.products[index] = {
        ...state.products[index],
        ...action.payload,
      };

      toast.success('Successful updated product');
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      toast.error(getError(action.error));
    },

    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.products.findIndex(
        (product) => product._id === action.payload
      );
      state.products.splice(index, 1);
      toast.success('Successfuly deleted product');
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      toast.error(getError(action.error));
    },
  },
});

export default productsSlice.reducer;

export const selectProducts = (state) => state?.products;
