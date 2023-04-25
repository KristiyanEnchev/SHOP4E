import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './components/Authentication/Login.jsx';
import Register from './components/Authentication/Register.jsx';
import RequireAuth from './components/AuthComponent/RequireAuth.jsx';
import PageNotFound from './components/common/404/PageNotFound.jsx';
import Navigation from './components/common/Nav/Navigation.jsx';
import Guest from './components/AuthComponent/Guest.jsx';
import Scroll from './components/common/scrollTop/scrollTop.jsx';
import Footer from './components/common/Footer/Footer.jsx';
import Product from './components/Product/Product.jsx';
import Profile from './components/Profile/Profile.jsx';
import Home from './components/common/Layout/Home.jsx';
import Cart from './components/Cart/Cart.jsx';
import Products from './components/Products/Products.jsx';
import Success from './components/common/Success.jsx';
import Cancel from './components/common/Cancel.jsx';
import ShippingForm from './components/Cart/ShippingForm.jsx';
import Orders from './components/Profile/Orders.jsx';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      <Navigation />
      <Cart />
      <main className="flex-1">
        <Routes>
          <Route element={<Guest />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/products" element={<Products />} />
          <Route element={<RequireAuth />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/shipping" element={<ShippingForm />} />
            <Route path="/success" element={<Success />} />
            <Route path="/canceled" element={<Cancel />} />
          </Route>

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Scroll showBelow={250} />
      <Footer />
    </div>
  );
}

export default App;
