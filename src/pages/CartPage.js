import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';

const CartPage = () => {
  const { 
    cart, 
    loading, 
    error, 
    updateCartItem, 
    removeFromCart, 
    checkout, 
    cartCount, 
    cartTotal 
  } = useCart();

  const handleCheckout = async () => {
    const success = await checkout();
    if (success) {
      alert('Đặt hàng thành công!');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
      
      {cartCount === 0 ? (
        <div className="text-center py-12 bg-white rounded-sm shadow-md">
          <p className="text-gray-500 text-lg">Giỏ hàng trống</p>
          <Link 
            to="/products" 
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-sm"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-sm shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-4">
              <div className="divide-y divide-gray-200">
                {cart.map(item => (
                  <div key={item.productId} className="py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-sm overflow-hidden">
                        <img 
                          src={item.image || '/placeholder-product.jpg'} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-600">{item.price.toLocaleString()} VND</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateCartItem(item.productId, e.target.value)}
                        className="w-16 px-2 py-1 border rounded-sm text-center"
                      />
                      <button 
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-gray-50">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h2 className="text-lg font-medium">Tổng đơn hàng</h2>
                <div className="flex justify-between mt-2">
                  <span>Tổng cộng ({cartCount} sản phẩm):</span>
                  <span className="font-medium">{cartTotal.toLocaleString()} VND</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-sm"
              >
                Thanh toán
              </button>
              <Link 
                to="/products" 
                className="mt-2 inline-block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-sm"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;