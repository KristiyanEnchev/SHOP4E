import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import {
  getProductBySlug,
  selectProduct,
} from '../../redux/Public/productSlice';
import { getProducts, selectProducts } from '../../redux/Public/productsSlice';
import { addToCart } from '../../redux/Public/cartSlice';
import ProductCard from './ProductCard';
import Rating from '../rating/rating.jsx';
import Loader from '../common/Loader/Loader';
import { Button } from '../ui/button.jsx';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { checkStripeAvailability } from '@/redux/Public/orderSlice.js';

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const product = useSelector(selectProduct);
  const { products } = useSelector(selectProducts);
  const [amount, setAmount] = useState(1);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProductBySlug(slug));
      await dispatch(getProducts());
    };
    fetchData();
  }, [dispatch, slug]);

  const handleBuyNow = async () => {
    const result = await dispatch(checkStripeAvailability()).unwrap();
    if (!result.stripeEnabled) {
      toast.error('Payment service is currently unavailable');
      return;
    }
    dispatch(addToCart({ product, amount }));
    navigate('/shipping');
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ product, amount }));
    setAmount(1);
  };

  const incAmount = () => {
    setAmount((oldAmount) => oldAmount + 1);
  };

  const decAmount = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };

  if (!product || !product.name) {
    return <Loader />;
  }

  const { name, description, price, images } = product;

  const relatedProducts = products?.filter((item) => item.slug !== slug);

  return (
    <div className="bg-neutral-100">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-16">
          {/* Product Images */}
          <div>
            <div className="image-container">
              <img
                src={images && images[index]}
                className="w-full h-[500px] object-contain bg-white rounded-lg"
                alt={name}
              />
            </div>
            <div className="flex gap-4 mt-4">
              {images &&
                images.map((item, i) => (
                  <div
                    key={i}
                    className={`border-2 rounded-lg p-2 cursor-pointer transition-all
                      ${i === index ? 'border-red-500' : 'border-transparent'}`}
                    onMouseEnter={() => setIndex(i)}
                  >
                    <img
                      src={item}
                      alt={`${name} view ${i + 1}`}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{name}</h1>

            <div className="reviews">
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900">Details:</h4>
              <p className="text-gray-600 mt-2">{description}</p>
            </div>

            <p className="text-3xl font-bold text-red-500">${price}</p>

            <div className="quantity">
              <h3 className="text-lg font-semibold text-gray-900">Quantity:</h3>
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={decAmount}
                  className="p-2 rounded-full border hover:bg-gray-100"
                >
                  <AiOutlineMinus />
                </button>
                <span className="text-xl font-medium w-8 text-center">
                  {amount}
                </span>
                <button
                  onClick={incAmount}
                  className="p-2 rounded-full border hover:bg-gray-100"
                >
                  <AiOutlinePlus />
                </button>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={addToCartHandler}
                className="flex-1 px-6 py-3 bg-white text-gray-900 rounded-full
                  font-semibold border-2 border-gray-900 hover:bg-gray-900
                  hover:text-white transition-colors"
              >
                Add to Cart
              </button>
              <Button
                onClick={handleBuyNow}
                className="flex-1 h-11 bg-gradient-to-r from-red-400 to-red-500 hover:opacity-90
                  transition-all shadow-lg shadow-red-500/30 text-white font-semibold text-base rounded-full"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products with Marquee */}
        <div className="py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You may also like
          </h2>
          <div className="relative h-[500px] w-full overflow-x-hidden">
            <div className="absolute whitespace-nowrap w-[180%] animate-marquee hover:animate-pause">
              <div className="flex">
                {relatedProducts?.map((item) => (
                  <div key={item._id} className="min-w-[300px] px-4">
                    <ProductCard product={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
