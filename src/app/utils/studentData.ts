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
console.log("BASE URL", baseURL)
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

// API functions
export const getAllStudents = async (pageNumber = 1, pageSize = 10, SearchQuery= "") => {
  try {
    const response = await axiosInstance.get(`Students?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${SearchQuery}`);
    const totalItems = parseInt(response.data.pagination.totalItems);
    const totalPages = parseInt(response.data.pagination.totalPages);
    return {
      students: response.data.students,
      counts: response.data.pagination.totalItems,
      totalItems,
      totalPages,
    };
  } catch (error) {
    handleErrors(error);
  }
};
export const getAllProspects = async (pageNumber = 1, pageSize = 10, SearchQuery= "") => {
  try {
    const response = await axiosInstance.get(`Students/prospects?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${SearchQuery}`);
    const totalItems = parseInt(response.data.pagination.totalItems);
    const totalPages = parseInt(response.data.pagination.totalPages);
    return {
      students: response.data.students,
      prospectsCounts: response.data.pagination.totalItems,
      totalItems,
      totalPages,
    };
  } catch (error) {
    handleErrors(error);
  }
};


// export const getAllProspects = async () => {
//   try {
//     const response = await axiosInstance.get('Students/prospects');
//     return response.data;
//   } catch (error) {
//     handleErrors(error);
//   }
// };

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


export const getAudits = async (pageNumber = 1, pageSize = 10, SearchQuery= "") => {
  try {
    const response = await axiosInstance.get(`Audits?pageNumber=${pageNumber}&pageSize=${pageSize}&name=${SearchQuery}`);
    const totalItems = parseInt(response.data.pagination.totalItems);
    const totalPages = parseInt(response.data.pagination.totalPages);
    return {
      audits: response.data.audit,
      prospectsCounts: response.data.pagination.totalItems,
      totalItems,
      totalPages,
    };
  } catch (error) {
    handleErrors(error);
  }
};

export const getDashboardData = async () => {
  try {
    const response = await axiosInstance.get(`Dashboard/stats`);
    console.log("Response: ", response)
    return response.data;
  } catch (error) {
    handleErrors(error);
  }
};