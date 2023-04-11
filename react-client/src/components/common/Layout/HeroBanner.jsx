import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBanners } from '../../../redux/Public/BannerSlice.js';
import Loader from '../Loader/Loader.jsx';

const HeroBanner = () => {
  const dispatch = useDispatch();
  const [banner, setBanner] = useState({});
  const { banners, status } = useSelector((state) => state.banners);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      setBanner(banners[0]);
    }
  }, [banners, status]);

  if (status === 'loading') return <Loader />;

  return (
    <>
      {banner && (
        <div className="relative bg-gray-200 min-h-[400px] rounded-2xl overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 py-12 flex items-center justify-between">
            {/* Left Content */}
            <div className="flex-1 pr-8">
              <p className="text-sm uppercase tracking-wider text-gray-600 mb-2">
                {banner.samllText}
              </p>
              <h1 className="text-6xl font-bold text-gray-900 mb-4">
                {banner.midText}
              </h1>
              <h2 className="text-[8em] font-bold text-white leading-none mb-8 -ml-5 uppercase">
                {banner.largeText}
              </h2>
              <Link to={`/product/${banner.productSlug}`}>
                <button className="bg-red-500 text-white text-sm font-medium px-6 py-2 rounded-full hover:bg-red-600 transition-colors">
                  {banner.buttonText}
                </button>
              </Link>
            </div>

            {/* Right Content */}
            <div className="flex-1 relative">
              <img
                src={banner.img}
                alt={banner.buttonText}
                className="w-full max-w-[600px] h-auto transform -rotate-12 hover:rotate-0 transition-transform duration-500"
              />

              {/* Description Overlay */}
              <div className="absolute bottom-0 right-0 bg-white/80 backdrop-blur-sm p-4 rounded-lg max-w-xs">
                <h5 className="text-sm font-semibold text-gray-900 mb-1">
                  Description
                </h5>
                <p className="text-sm text-gray-600">{banner.description}</p>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <button className="w-2 h-2 rounded-full bg-red-500"></button>
            <button className="w-2 h-2 rounded-full bg-gray-400 hover:bg-gray-500 transition-colors"></button>
            <button className="w-2 h-2 rounded-full bg-gray-400 hover:bg-gray-500 transition-colors"></button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroBanner;
