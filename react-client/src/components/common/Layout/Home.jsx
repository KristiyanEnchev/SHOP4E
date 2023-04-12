import { Outlet } from 'react-router-dom';
import FooterBanner from './FooterBanner.jsx';
import HeroBanner from './HeroBanner.jsx';
import { useEffect } from 'react';
import ProductCard from '../../Product/ProductCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProducts,
  selectProducts,
} from '../../../redux/Public/productsSlice.js';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(selectProducts);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getProducts());
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="max-w-[1400px] mx-auto px-4">
        <main className="py-8">
          <HeroBanner />

          <div className="text-center my-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Best Seller Products
            </h2>
            <p className="text-gray-600 text-lg">
              Sneakers There are many variations passages
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products &&
              products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <FooterBanner />
        </main>
      </div>
      <Outlet />
    </>
  );
};

export default Home;
