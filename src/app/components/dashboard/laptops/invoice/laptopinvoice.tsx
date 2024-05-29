import React,{useState} from 'react'
import styles from './modal.module.css';
import { useRouter } from 'next/navigation'
// import supabase from '@/app/lib/supabase';
import { ToastContainer, toast } from "react-toastify";
import {generateReport} from '@/app/lib/jsreportservice'
import { updateLaptop } from '@/app/utils/laptopData';
import { storeLaptopInvoice } from '@/app/utils/invoiceData';
import { generateLaptopInvoice } from '@/app/utils/laptopData';

const Laptopinvoice = ({ isOpen, onClose, closeModal, laptop }: { isOpen: any, onClose: any, closeModal: any, laptop:any }) => {
  function formatDate(date:any) {
    // Get month, day, and year
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
  
    // Return the formatted date
    return `${month}/${day}/${year}`;
  }
  
  // Example usage
  const today = new Date();
  const formattedDate = formatDate(today);
 
  const router = useRouter()
  const [formData, setFormData] = useState({
 
    customerName: '',
    address: '',
    phone: '',
    email: '',
    id: laptop.id,
    date: formattedDate

  });
  

 
 
 
   const [errors, setErrors] = useState({
 
    customerName: '',
    address: '',
    phone: '',
    email: ''
   });
 
   const handleInputChange = (e:any) => {
     const { name, value } = e.target;
     setFormData((prevData) => ({
       ...prevData,
       [name]: value,
     }));
   };
 
   const validateForm = () => {
     const newErrors = {
  
      customerName: '',
    address: '',
    phone: '',
    email: ''
     };
 
     // Form Validations
     if (!formData.customerName) {
       newErrors.customerName = 'Fullname is required';
     } 
     if (!formData.address) {
       newErrors.address = 'Address Type is required';
     } 
 
     if (!formData.phone) {
       newErrors.phone = 'Phone number is required';
     }
 
     if (!formData.email) {
       newErrors.email = 'Email  is required';
     }
 
    
     
 
 
     setErrors(newErrors);
 
    
     return Object.values(newErrors).every((error) => !error);
   };
 
  
 
 
   const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await updateLaptop(laptop.id, {
          ...laptop,
          isAvailable: false 
        });
      
        toast.success("laptop purchased successfully");
        
        const data = {
          name: formData.customerName,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          invoiceNumber: "",
          date: "",
          price: laptop.price,
          laptop: {
            brand: laptop.brand,
            model: laptop.model,
            processor: laptop.processor,
            ram: laptop.ram,
            storageSize:laptop.storageSize,
            storageType:laptop.storageType,
            serialNumber: laptop.serialNumber,
            processorSpeed: laptop.processorSpeed,
            gpuSize: "",
            isAvailable: false,
            batchId: 0,
            price: laptop.price,
          },
          laptopId: laptop.id
        };
    
        const pdfBlob:any = await generateLaptopInvoice(data);
        const pdfUrl = URL.createObjectURL(pdfBlob);
      } catch (error) {
        console.error("An error occurred while generating the invoice:", error);
      }
    }}
 
   return (
     <>
      <ToastContainer 
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              draggable={false}
             
              closeOnClick
              pauseOnHover
         />
       {isOpen && (
         <div className={styles.modalOverlay} onClick={onClose}>
           <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
             <h2>Customer info</h2>
            
            <form onSubmit={handleSubmit}>
        
              <div className={styles.formGroup}>
                <label >Fullname</label>
                <input type="text" onChange={handleInputChange} value={formData.customerName} name="customerName" id="" />
                <span className={styles.error}>{errors.customerName}</span>
             
              </div>
              <div className={styles.formGroup}>
                <label >Address</label>
                <input type="text" onChange={handleInputChange} value={formData.address} name="address" id="" />
                <span className={styles.error}>{errors.address}</span>
              
              </div>
              <div className={styles.formGroup}>
                <label >Number</label>
                <input type="number" onChange={handleInputChange} value={formData.phone} name="phone" id="" />
                <span className={styles.error}>{errors.phone}</span>
            
              </div>
              <div className={styles.formGroup}>
                <label >Email </label>
                <input type="email" onChange={handleInputChange} value={formData.email} name="email" id="" />
                <span className={styles.error}>{errors.email}</span>
              
              </div>
              
              <div className={styles.formGroup}>
              

             <button>Print</button>
              </div>
 
              
             </form>
            
             
           </div>
         </div>
       )}
     </>
   );
 };
 
 export default Laptopinvoice;
  