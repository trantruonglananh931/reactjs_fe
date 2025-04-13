import React from 'react';
import ProductDetail from '../../components/product/ProductDetail';
const ProductDetailPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="product-detail-page p-6">
            <ProductDetail />
          </div>
    </div>
  );
};

export default ProductDetailPage;