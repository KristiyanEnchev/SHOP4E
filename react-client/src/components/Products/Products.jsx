import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import {
  getProducts,
  selectProducts,
} from '../../redux/Public/productsSlice.js';
import ProductCard from '../Product/ProductCard.jsx';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(selectProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      let filtered = [...products];
      filtered = filtered.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      if (searchTerm) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      switch (sortBy) {
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
      setFilteredProducts(filtered);
    }
  }, [products, priceRange, searchTerm, sortBy]);

  const handleReset = () => {
    setSearchTerm('');
    setPriceRange([0, 1000]);
    setSortBy('featured');
  };

  return (
    <>
      <Helmet>
        <title>Products - Shop4E</title>
      </Helmet>

      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <div className="sticky top-24 w-full md:w-64 bg-white rounded-lg shadow-md p-6 space-y-6 h-fit">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Filters
              </h3>
              <div className="relative">
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 bg-gray-50 border-gray-200 focus:border-primary"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Price Range
              </h4>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="relative rounded-md shadow-sm">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([+e.target.value, priceRange[1]])
                      }
                      className="pl-8 w-24 bg-gray-50"
                    />
                  </div>
                  <span className="text-gray-500">to</span>
                  <div className="relative rounded-md shadow-sm">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], +e.target.value])
                      }
                      className="pl-8 w-24 bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Sort By
              </h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>

            <button
              onClick={handleReset}
              className="w-full bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Reset Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              All Products
            </h1>
            {filteredProducts.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No products found
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
