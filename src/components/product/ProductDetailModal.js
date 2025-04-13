import React from 'react';

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-sm w-3/4 flex relative">
        {/* Nút đóng modal */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Hình ảnh bên trái */}
        <div className="w-1/3 mr-6">
          <img 
            src={`http://localhost:3000/${product.imgUrl}`} 
            alt={product.name} 
            className="w-full h-auto object-cover rounded-sm"
          />
        </div>

        {/* Thông tin sản phẩm bên phải */}
        <div className="w-2/3">
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <div className="mb-4">
            <strong>Price:</strong> {product.price.toLocaleString()} VND
          </div>
          <div className="mb-4">
            <strong>Quantity:</strong> {product.quantity}
          </div>
          <div className="mb-4">
            <strong>Description:</strong> {product.description || 'No description'}
          </div>
          <div className="mb-4">
            <strong>Category:</strong> {product.category?.name || 'Uncategorized'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
