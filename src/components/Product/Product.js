import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
// IoStarHalf,
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../redux/cartSlice.js';
import { openModal } from '../../redux/modalSlice.js';
import { getProductBySlug, selectProduct } from '../../redux/productSlice.js';
import { getProducts, selectProducts } from '../../redux/productsSlice.js';
import { Loader } from '../common/Loader/Loader.js';

import { ProductCard } from './ProductCard.js';
const Product = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const product = useSelector(selectProduct);
  const { products } = useSelector(selectProducts);
  const { name, description, price, loading, images } = product;

  const [index, setIndex] = useState(0);

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    dispatch(openModal(true));
  };

  useEffect(() => {
    function fetchData() {
      dispatch(getProductBySlug(slug));
      dispatch(getProducts());
    }
    fetchData();
  }, [dispatch, slug]);

  if (loading) {
    <Loader></Loader>;
  } else {
    return (
      <div>
        <Helmet>
          <title>Product Page</title>
        </Helmet>
        <div className="product-detail-container">
          <div>
            <div className="image-container">
              <img
                src={images && images[index]}
                className="product-detail-image"
                alt="product"
              />
            </div>
            <div className="small-images-container">
              {images &&
                images?.map((item, i) => (
                  <img
                    key={i}
                    alt="troduct"
                    src={item}
                    className={
                      i === index ? 'small-image selected-image' : 'small-image'
                    }
                    onMouseEnter={() => setIndex(i)}
                  />
                ))}
            </div>
          </div>

          <div className="product-detail-desc">
            <h1>{name}</h1>
            <div className="reviews">
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>(20)</p>
            </div>
            <h4>Details: </h4>
            <p>{description}</p>
            <p className="price">${price}</p>
            <div className="quantity">
              <h3>Quantity:</h3>
              {/* <p className="quantity-desc">
                <span className="minus" onClick={decQty}>
                  <AiOutlineMinus />
                </span>
                <span className="num">{qty}</span>
                <span className="plus" onClick={incQty}>
                  <AiOutlinePlus />
                </span>
              </p> */}
            </div>
            <div className="buttons">
              <button
                type="button"
                className="add-to-cart"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
              <button type="button" className="buy-now" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products?.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Product;
