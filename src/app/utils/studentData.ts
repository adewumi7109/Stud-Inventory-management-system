import axios, { AxiosInstance } from 'axios';

// Function to get the token from localStorage
const getToken = (): string | null => {
  const storedUserDataString = localStorage.getItem('userData');
  if (storedUserDataString) {
    const storedUserData = JSON.parse(storedUserDataString);
    return storedUserData.response.token;
  }
  return null;
};
// Create an Axios instance with default configuration
const token = getToken();
// console.log("TOKEN: ", token)
const axiosInstance = axios.create({
  baseURL: 'https://localhost:7014/api/',
  headers: {
    'Content-Type': 'application/json',
    // Add authorization header with the token
    'Authorization': `Bearer ${token}`
  }
});

// // Add an interceptor to update headers before each request is sent
// axiosInstance.interceptors.request.use((config) => {
//   // Get the token from localStorage
//   const token = getToken();
//   // If token exists, set Authorization header with the token
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// });
// Function to update headers with the token
const updateHeaders = () => {
  axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
};
updateHeaders()
// Function to handle errors
const handleErrors = (error:any) => {
  console.error('Error:', error);
  throw error;
};

// Function to handle errors
// const handleErrors = (error: any) => {
//   console.error('Error:', error);
//   throw error;
// };

// API functions
export const getAllStudents = async () => {
  try {
    const response = await axiosInstance.get('Students');
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const getAllProspects = async () => {
  try {
    const response = await axiosInstance.get('Students/prospects');
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const fetchStudentById = async (id: any) => {
  try {
    const response = await axiosInstance.get(`Students/${id}`);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const updateStudent = async (id: any, studentData: any) => {
  try {
    const response = await axiosInstance.put(`Students/${id}`, studentData);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const storeStudent = async (studentData: any) => {
  try {
    const response = await axiosInstance.post('Students', studentData);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const storeBill = async (billData: any) => {
  try {
    const response = await axiosInstance.post('Students/createbill', billData);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const generateStudentInvoice = async (invoiceData: any) => {
  try {
    const apiUrl = 'Invoices/generate-student-invoice';
    const response = await axiosInstance.post(apiUrl, invoiceData, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};


