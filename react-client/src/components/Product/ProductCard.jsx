import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { image, name, slug, price } = product;

  return (
    <Link to={`/product/${slug}`}>
      <div className="group">
        <div className="relative overflow-hidden rounded-2xl bg-gray-100 p-6">
          <img
            src={image}
            alt={name}
            className="w-full h-[300px] object-contain transform transition-transform
              duration-500 group-hover:scale-110"
          />

          {/* Quick Shop Overlay - Optional */}
          <div
            className="absolute inset-0 bg-black/40 flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <button
              className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium
              transform -translate-y-4 group-hover:translate-y-0 transition-all"
            >
              Quick View
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <h3
            className="font-medium text-gray-900 group-hover:text-red-500
            transition-colors truncate"
          >
            {name}
          </h3>
          <p className="text-lg font-bold text-red-500">${price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
