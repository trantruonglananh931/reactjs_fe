// src/components/CartIcon.js
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  // Destructure only what you need
  const { cartCount } = useCart();

  return (
    <Link to="/cart" className="relative inline-flex items-center">
      <ShoppingCartIcon className="h-6 w-6 text-gray-600 hover:text-blue-600" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;