import axios from 'axios';

export const  sendPaymentData = async (paymentData: any) => {
  return await axios.put('https://localhost:7014/api/Payments', paymentData)
    .then(response => {
      // Handle response from server
      return response.data;
    })
    .catch(error => {
      // Handle error
      throw error;
    });
};
