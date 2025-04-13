import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {isAuthenticated ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome back, {user?.fullName || user?.username}!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            You are logged in as {user?.role}.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm font-medium"
            >
              Browse Products
            </Link>
            <Link
              to="/cart"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md text-sm font-medium"
            >
              View Cart
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Our Shop
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Please log in to shop or sign up if you're new here.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md text-sm font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;