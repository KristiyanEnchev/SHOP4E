import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBanners } from '../../../redux/Public/BannerSlice.js';
import Loader from '../Loader/Loader.jsx';

const FooterBanner = () => {
  const dispatch = useDispatch();
  const [banner, setBanner] = useState(null);
  const { banners, status } = useSelector((state) => state.banners);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded' && banners && banners.length > 1) {
      setBanner(banners[1]);
    }
  }, [banners, status]);

  if (status === 'loading') return <Loader />;
  if (!banner) return null;

  return (
    <div className="bg-red-500 text-white rounded-2xl px-8 py-16 mt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 relative">
        <div>
          <p className="text-xl font-medium mb-4">
            {banner?.discount || 'Discount'}
          </p>
          <h3 className="text-5xl font-bold mb-6">
            {banner?.midText || 'Mid Text'}
          </h3>
          <p className="text-lg opacity-90">
            {banner?.samllText || 'Small Text'}
          </p>
        </div>

        {/* Center Image */}
        {banner?.img && (
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:block">
            <img
              src={banner.img}
              alt="banner"
              className="h-[250px] w-[500px] object-contain -rotate-12 hover:rotate-0 transition-transform duration-500"
            />
          </div>
        )}

        <div className="text-right">
          <h3 className="text-4xl font-bold mb-4">
            {banner?.largeText || 'Large Text'}
          </h3>
          <p className="text-lg mb-8 opacity-90">
            {banner?.description || 'Description'}
          </p>
          <Link to={`/products`}>
            <button className="px-8 py-3 bg-white text-red-500 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              {banner?.buttonText || 'Shop Now'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
