import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and menu items */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              MyApp
            </Link>
            <Link to="/product" className="text-gray-700 hover:text-indigo-600">
              Products
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-indigo-600">
              Pricing
            </Link>
          </div>
          
          {/* Right side - Auth related buttons */}
          <div className="flex items-center space-x-4">
              {currentUser?.role === 'admin' && (
              <Link
                to="/admin"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Admin
              </Link>
            )}
            {currentUser ? (
              <>
                <span className="text-gray-700">Welcome, {currentUser.fullName}</span>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Dashboard
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
                  className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;