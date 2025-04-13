import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
  
          <div className="flex items-center space-x-6">
            <Link to="/products" className="text-xl font-bold text-blue-600">
              MY SHOP
            </Link>
            {isAuthenticated && user?.data?.role?.name === 'admin' && (
              <>
                <Link to="/aproducts" className="text-gray-700 hover:text-blue-600">
                  Products
                </Link>
                <Link to="/categories" className="text-gray-700 hover:text-blue-600">
                  Categories
                </Link>
                <Link to="/users" className="text-gray-700 hover:text-blue-600">
                  Users
                </Link>
                <Link to="/roles" className="text-gray-700 hover:text-blue-600">
                  Roles
                </Link>
              </>
            )}

            {isAuthenticated && user?.data?.role?.name === 'user' && (
              <Link to="/products" className="text-gray-700 hover:text-blue-600">
                Products
              </Link>
            )}


          </div>

          {/* Right side - Authentication */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 hidden md:block">Hi, {user?.data?.fullName}</span>
                <Link to="/cart" className="text-gray-700 hover:text-blue-600 relative flex items-center">
                  Cart
                  <span className="ml-1 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    0
                  </span>
                </Link>
                <button
                  onClick={async () => {
                    try {
                      await logout();
                      navigate('/');
                    } catch (error) {
                      console.error('Logout failed:', error);
                      navigate('/');
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
