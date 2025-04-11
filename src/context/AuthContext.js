import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        setCurrentUser(JSON.parse(user));
      } catch (e) {
        console.error("Failed to parse user data:", e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      setError(null);
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password
      });
      
      if (!response.data || !response.data.user) {
        throw new Error('Invalid response from server');
      }

      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      
      return user;
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Login failed');
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