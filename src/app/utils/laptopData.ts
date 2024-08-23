import axios from 'axios';

// Function to get the token from localStorage
const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    const storedUserDataString = localStorage.getItem('userData');
    if (storedUserDataString) {
      const storedUserData = JSON.parse(storedUserDataString);
      return storedUserData.response.token;
    }
  }
  return null;
};
const baseURL = process.env.NEXT_PUBLIC_LOCALHOST_BASE_URL;
// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add an interceptor to update headers before each request is sent
axiosInstance.interceptors.request.use((config) => {
  // Get the token from localStorage
  const token = getToken();
  // If token exists, set Authorization header with the token
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  // Handle the error
  return Promise.reject(error);
});

// Function to handle errors
const handleErrors = (error: any) => {
  console.error('Error:', error);
  throw error;
};

// export const getAllLaptops = async () => {
//   try {
//     const response = await axiosInstance.get('Laptops');
//     return response.data;
//   } catch (error) {
//     handleErrors(error);
//   }
// };

export const getAllLaptops = async (pageNumber = 1, pageSize = 10, SearchQuery= "") => {
  try {
    const response = await axiosInstance.get(`Laptops?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${SearchQuery}`);
    const totalItems = parseInt(response.data.pagination.totalItems);
    const totalPages = parseInt(response.data.pagination.totalPages);
    console.log("totalItems: ", totalItems, pageSize)
    return {
      laptops: response.data.laptops,
      laptopCounts: response.data.pagination.totalItems,
      totalItems,
      totalPages,
    };
  } catch (error) {
    handleErrors(error);
  }
};

export const fetchLaptopById = async (id: any) => {
  try {
    const response = await axiosInstance.get(`Laptops/${id}`);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};
export const soldLaptopsCount = async () => {
  try {
    const response = await axiosInstance.get(`Laptops/soldlaptopcount`);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const updateLaptop = async (id: any, laptopData: any) => {
  try {
    const response = await axiosInstance.put(`Laptops/${id}`, laptopData);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const deleteLaptop = async (id: any) => {
  try {
    const response = await axiosInstance.delete(`Laptops/${id}`);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const storeLaptop = async (laptopData: any) => {
  try {
    const response = await axiosInstance.post('Laptops', laptopData);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const checkSerialNumber = async (serialNumber: any) => {
  try {
    const response = await axiosInstance.get(`Laptops/check?serialNumber=${serialNumber}`);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const getAllLaptopInvoices = async () => {
  try {
    const response = await axiosInstance.get(`Laptops/invoices`);
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};

export const generateLaptopInvoice = async (data: any) => {
  try {
    const response = await axiosInstance.post('Laptops/generate-laptop-invoice', data, {
      responseType: 'blob' // Ensure the response is a Blob for the PDF
    });

    if (response.status === 200) {
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);
    } else {
      const errorMessage = `Error: Failed to generate the report. Status code: ${response.status}`;
      console.error(errorMessage);
    }
  } catch (error) {
    handleErrors(error);
  }
};
