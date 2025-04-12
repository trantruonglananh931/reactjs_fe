// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
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
import UserFormPage from './pages/user/UserFormPage';
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/products/edit/:id" element={<ProductForm isEdit />} />
          <Route path="/categories" element={<CategoryListPage />} />
            <Route path="/categories/new" element={<CategoryFormPage />} />
            <Route path="/categories/:id" element={<CategoryDetailPage />} />
            <Route path="/categories/edit/:id" element={<CategoryFormPage isEdit />} />
            <Route path="/roles" element={<RoleListPage />} />
            <Route path="/roles/new" element={<RoleFormPage />} />
            <Route path="/roles/:id" element={<RoleDetailPage />} />
            <Route path="/roles/edit/:id" element={<RoleFormPage isEdit />} />
            <Route path="/users" element={<UserListPage />} />
            <Route path="/users/new" element={<UserFormPage />} />
            <Route path="/users/:id" element={<UserDetailPage />} />
            <Route path="/users/edit/:id" element={<UserFormPage isEdit />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/*" 
            element={
              <AdminRoute>
                <AdminPage />
              </AdminRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

export default App;