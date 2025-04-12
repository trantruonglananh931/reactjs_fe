import React from 'react';
import ProductDetail from '../../components/product/ProductDetail';
import Navigation from '../../components/Navigation';
const ProductDetailPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Navigation />
          <div className="product-detail-page p-6">
            <ProductDetail />
          </div>
    </div>
  );
};

export default ProductDetailPage;