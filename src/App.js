import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminRoute from './components/AdminRoute';
import RoleListPage from './pages/role/RoleListPage';
import RoleDetailPage from './pages/role/RoleDetailPage';
import RoleFormPage from './pages/role/RoleFormPage';
import ProductsPage from './pages/product/ProductsPage';
import ProductDetailPage from './pages/product/ProductDetailPage';
import CategoryListPage from './pages/category/CategoryListPage';
import CategoryDetailPage from './pages/category/CategoryDetailPage';
import CategoryFormPage from './pages/category/CategoryFormPage';
import ProductForm from './components/product/ProductForm';
import UserListPage from './pages/user/UserListPage';
import UserDetailPage from './pages/user/UserDetailPage';
import CartPage from './pages/CartPage';
import ProductAdmin from './components/product/ProductAdmin';
import { CartProvider } from './context/CartContext';
import UserFormPage from './pages/user/UserFormPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import SignupPage from './pages/SignupPage';

function App() {
  return (

    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/products" element={<ProductsPage />} />

            <Route path="/products/:id" element={<ProductDetailPage />} />

            <Route path="/categories" element={<CategoryListPage />} />

            <Route path="/categories/:id" element={<CategoryDetailPage />} />


            <Route path="/cart" element={<CartPage />} />
            <Route element={<AdminRoute />}>
              <Route path="/categories/edit/:id" element={<CategoryFormPage isEdit />} />
              <Route path="/aproducts" element={<ProductAdmin />} />
              <Route path="/aproducts/new" element={<ProductForm />} />
              <Route path="/categories/new" element={<CategoryFormPage />} />
              <Route path="/aproducts/edit/:id" element={<ProductForm isEdit />} />
              <Route path="/roles" element={<RoleListPage />} />
              <Route path="/roles/new" element={<RoleFormPage />} />
              <Route path="/roles/:id" element={<RoleDetailPage />} />
              <Route path="/roles/edit/:id" element={<RoleFormPage isEdit />} />
              <Route path="/users" element={<UserListPage />} />
              <Route path="/users/new" element={<UserFormPage />} />
              <Route path="/users/:id" element={<UserDetailPage />} />
              <Route path="/users/edit/:id" element={<UserFormPage isEdit />} />

            </Route>
          </Routes>

        </Router>
      </CartProvider>
    </AuthProvider>

  );
}

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

export default App;