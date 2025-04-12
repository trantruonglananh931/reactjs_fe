import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/api';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

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
  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xoá sản phẩm này?")) {
      try {
        await deleteProduct(id);
        alert("Xoá thành công");
      } catch (err) {
        alert("Lỗi khi xoá sản phẩm");
        console.error(err);
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (

    <div className="product-list">
      <div className="filters mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-sm mr-4"
        />
        <div className="price-range inline-block">
          <input
            type="number"
            placeholder="Min price"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
            className="px-4 py-2 border rounded-sm mr-2 w-24"
          />
          <span className="mx-2">to</span>
          <input
            type="number"
            placeholder="Max price"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
            className="px-4 py-2 border rounded-sm w-24"
          />
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No products found. Try adjusting your search filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product._id} className="product-card bg-white rounded-sm shadow-md p-4">
              <div className="product-image bg-gray-200 h-48 mb-4 rounded-sm">
                <img
                  src={product.imgURL}
                  alt={product.name}
                  className="h-full w-full object-cover rounded-sm"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.price} VND</p>
              <p className="text-gray-500 mb-4">Quantity: {product.quantity}</p>
              <div className="flex justify-between">
                <Link
                  to={`/products/${product._id}`}
                  className="text-blue-600 hover:text-blue-800"
                  title="Xem chi tiết"
                >
                  <EyeIcon className="h-5 w-5" />
                </Link>
                <Link
                  to={`/products/edit/${product._id}`}
                  className="text-green-600 hover:text-green-800"
                  title="Chỉnh sửa"
                >
                  <PencilSquareIcon className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 hover:text-red-800"
                  title="Xoá sản phẩm"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;