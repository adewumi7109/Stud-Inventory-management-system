

import axios from 'axios';

export const login = async (formData:any) => {
  try {
    const response = await axios.post('https://localhost:7014/api/Auth/login', formData);
    localStorage.setItem('userData', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const register = async (formData:any) => {
    try {
      const response = await axios.post('https://localhost:7014/api/Auth/register', formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
