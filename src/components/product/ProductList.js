import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../services/productApi.js';
import { EyeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const query = {};

        if (searchTerm) {
          query.name = searchTerm;
        }

        if (priceRange.min || priceRange.max) {
          query.price = {};
          if (priceRange.min) query.price.$gte = Number(priceRange.min);
          if (priceRange.max) query.price.$lte = Number(priceRange.max);
        }

        const response = await getProducts(query);
        setProducts(response.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [searchTerm, priceRange]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No products found. Try adjusting your search filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const imgUrl = `http://localhost:3000/${product.imgUrl}`;
            return (
              <div key={product._id} className="bg-white rounded-sm shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square mt-2 bg-gray-100">
                  <img
                    src={imgUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 truncate">{product.name}</h3>
                  <p className="text-gray-700 font-medium mb-1">{product.price.toLocaleString()} VND</p>
                  <p className="text-gray-500 text-sm mb-3">Số lượng: {product.quantity}</p>
                  <div className="flex justify-between items-center">
                    <Link
                      to={`/products/${product._id}`}
                      className="text-blue-600 hover:text-blue-800"
                      title="Xem chi tiết"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      className="text-gray-600 hover:text-blue-600"
                      title="Thêm vào giỏ hàng"
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductList;
