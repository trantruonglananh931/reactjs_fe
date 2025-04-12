// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      setCurrentUser(JSON.parse(user));
      setAuthToken(token);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password
      });
      
      
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', userData);
      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };


const logout = async () => {
     try {
       // Thêm baseURL nếu cần
       await axios.post('http://localhost:3000/auth/logout', {}, {
         withCredentials: true 
       });
       
       localStorage.removeItem('user');
       setCurrentUser(null);
     } catch (error) {
       console.error('Logout error:', error);
       localStorage.removeItem('user');
       setCurrentUser(null);
     }
   };

  const value = {
    currentUser,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}