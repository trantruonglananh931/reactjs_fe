import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
function HomePage() {
     const navigate = useNavigate();
     const { currentUser, logout } = useAuth();
     return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
               <Navigation />
          

               {/* Hero Section */}
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                         <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                              Welcome to Our Platform
                         </h1>
                         <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                              Discover amazing features that will revolutionize your workflow and boost productivity.
                         </p>
                         <div className="flex justify-center space-x-4">
                              {currentUser ? (
                                   <Link
                                        to="/dashboard"
                                        className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                                   >
                                        Go to Dashboard
                                   </Link>
                              ) : (
                                   <>
                                        <Link
                                             to="/register"
                                             className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                                        >
                                             Get Started
                                        </Link>
                                        <Link
                                             to="/features"
                                             className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                                        >
                                             Learn More
                                        </Link>
                                   </>
                              )}
                         </div>
                    </div>
               </div>

               {/* Features Section */}
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Features</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                         <div className="bg-white p-6 rounded-lg shadow-md">
                              <div className="text-indigo-600 mb-4">
                                   <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                   </svg>
                              </div>
                              <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
                              <p className="text-gray-600">
                                   Our advanced security system protects your data with end-to-end encryption.
                              </p>
                         </div>

                         <div className="bg-white p-6 rounded-lg shadow-md">
                              <div className="text-indigo-600 mb-4">
                                   <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                   </svg>
                              </div>
                              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                              <p className="text-gray-600">
                                   Optimized for performance with minimal loading times and smooth transitions.
                              </p>
                         </div>

                         <div className="bg-white p-6 rounded-lg shadow-md">
                              <div className="text-indigo-600 mb-4">
                                   <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                   </svg>
                              </div>
                              <h3 className="text-xl font-semibold mb-2">User Dashboard</h3>
                              <p className="text-gray-600">
                                   Intuitive interface with all the tools you need in one convenient location.
                              </p>
                         </div>
                    </div>
               </div>
               <Footer />
          </div>
     );
}

export default HomePage;