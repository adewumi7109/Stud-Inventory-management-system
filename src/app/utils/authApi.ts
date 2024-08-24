
const baseURL = process.env.NEXT_PUBLIC_LOCALHOST_BASE_URL;
import axios from 'axios';

export const login = async (formData:any) => {
  try {
    const response = await axios.post(`${baseURL}Auth/login`, formData);
    if (typeof window !== "undefined") {
      localStorage.setItem('userData', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const register = async (formData:any) => {
    try {
      const response = await axios.post(`${baseURL}Auth/register`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
