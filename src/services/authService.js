import axios from 'axios';
import { API_URL } from '../constants';

export const login = async (username, password) => {
  
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  return response.data;
};

export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  return response.data;
};
