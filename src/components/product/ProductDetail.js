import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../services/productApi.js';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductById(id);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="product-image w-full md:w-1/2">
      
        <img
          src={product.imgURL}
          alt={product.name}
          className="w-full h-64 object-cover rounded-md"
        />
      </div>
      <div className="product-info w-full md:w-1/2">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 text-xl mb-4">{product.price} VND</p>
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Category:</span> {product.category?.name}
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Quantity:</span> {product.quantity}
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Description:</span> {product.description || 'No description available'}
        </p>
        <div className="flex gap-4 mt-6">
          {/* <Link
            to={`/products/edit/${product._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit Product
          </Link> */}
          <Link
            to="/products"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Add to cart
          </Link>
        </div>
      </div>
    </div>

  );
};

export default ProductDetail;