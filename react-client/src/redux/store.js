import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import AuthSlice from './Public/AuthSlice.js';
import BannerSlice from './Public/BannerSlice.js';
import ProductsSlice from './Public/productsSlice.js';
import productSlice from './Public/productSlice.js';
import cartSlice from './Public/cartSlice.js';
import modalSlice from './Public/modalSlice.js';
import UsersSlice from './Admin/UsersSlice.js';
import UserSlice from './Admin/UserSlice.js';
import OrderSlice from './Public/orderSlice.js';

const reducer = {
  auth: AuthSlice,
  banners: BannerSlice,
  products: ProductsSlice,
  product: productSlice,
  cart: cartSlice,
  modal: modalSlice,

  users: UsersSlice,
  user: UserSlice,
  orders: OrderSlice,
};

const store = configureStore(
  {
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: true,
  },
  applyMiddleware(thunk)
);

export default store;
