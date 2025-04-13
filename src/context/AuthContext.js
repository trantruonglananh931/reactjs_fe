import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:3000/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Session validation failed:', error);
          logout();
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password
      });
      
      if (response.data.success) {
        const { token, user } = response.data.data;
        
        localStorage.setItem('token', token);
        setToken(token);
        setUser(user);
        
        console.log('Login successful:', { token, user });
        return { success: true, user };
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Login failed'
      };
    }
  };
  const signup = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', userData);
      
      if (response.data.success) {
        const token = response.data.data;
        
        localStorage.setItem('token', token);
        setToken(token);
        
        console.log('Signup successful, token saved');
        return { 
          success: true,
          message: 'Đăng ký thành công! Vui lòng đăng nhập'
        };
      }
      throw new Error(response.data.message || 'Signup failed');
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Đăng ký thất bại'
      };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await axios.post('auth/logout', null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  };

  const isAdmin = () => {
    return user?.data?.role?.name === 'admin';
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);