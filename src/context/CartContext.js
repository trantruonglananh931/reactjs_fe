// src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';

// 1. Create context with default value
const CartContext = createContext({
  cart: [],
  cartCount: 0,
  cartTotal: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItem: () => {},
  checkout: () => {}
});

// 2. Create provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === product._id);
      if (existingItem) {
        return prevCart.map(item =>
          item.productId === product._id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.imgURL
      }];
    });
  };

  // Add other cart methods (removeFromCart, updateCartItem, etc.)

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart: (productId) => {
        setCart(prevCart => prevCart.filter(item => item.productId !== productId));
      },
      updateCartItem: (productId, quantity) => {
        setCart(prevCart =>
          prevCart.map(item =>
            item.productId === productId 
              ? { ...item, quantity: parseInt(quantity) || 1 } 
              : item
          )
        );
      },
      checkout: async () => {
        setCart([]);
        return true;
      }
    }}>
      {children}
    </CartContext.Provider>
  );
};

// 3. Create custom hook with error handling
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};