import React from 'react';
import ProductList from '../../components/product/ProductList';
import { Link } from 'react-router-dom';
const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="products-page p-6">
      <div className="flex justify-between items-center mb-6">
      
      </div>
      <ProductList />
    </div>
    </div>
  );
};

export default ProductsPage;