import React from 'react';
import { Link } from 'react-router-dom';

// Footer với props tuỳ chỉnh
const Footer = ({ simple = false }) => {
     return (
       <footer className={`bg-white ${simple ? 'py-4' : 'py-8'} border-t border-gray-200`}>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           {!simple && (
             <div className="flex flex-col md:flex-row justify-between items-center mb-8">
               <div className="mb-4 md:mb-0">
                 <Link to="/" className="text-xl font-bold text-indigo-600">
                   MyApp
                 </Link>
               </div>
               <div className="flex space-x-6">
                 <Link to="/privacy" className="text-gray-600 hover:text-indigo-600">
                   Privacy Policy
                 </Link>
                 <Link to="/terms" className="text-gray-600 hover:text-indigo-600">
                   Terms of Service
                 </Link>
                 <Link to="/contact" className="text-gray-600 hover:text-indigo-600">
                   Contact Us
                 </Link>
               </div>
             </div>
           )}
           <div className={`text-center text-gray-500 text-sm ${simple ? '' : 'mt-8'}`}>
             &copy; {new Date().getFullYear()} MyApp. All rights reserved.
           </div>
         </div>
       </footer>
     );
   };

export default Footer;