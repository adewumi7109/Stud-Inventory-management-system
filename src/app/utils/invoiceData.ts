import axios from "axios";
// Laptop Invoice


export const storeLaptopInvoice = async (invoiceData: any) => {
    try {
      const response = await axios.post('https://localhost:7014/api/Laptops/invoices', invoiceData);
      return response.data;
    } catch (error) {
      console.error('Error storing laptop:', error);
      throw error;
    }
  };
  export const getAllLaptopInvoices = async () => {
    try {
      const response = await axios.get('https://localhost:7014/api/Laptops/invoices');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  export const getAllStudentInvoices = async () => {
    try {
      const response = await axios.get('https://localhost:7014/api/Payments/Receipts');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  export const generateStudentInvoice = async (invoiceData: any) => {
    try {
      const response = await axios.post('https://localhost:7014/api/Invoices/generate-student-invoice', invoiceData);
      return response.data;
    } catch (error) {
      console.error('Error generating invoice:', error);
      throw error;
    }
  };