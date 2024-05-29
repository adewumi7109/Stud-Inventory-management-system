import React,{useState} from 'react'
import styles from './modal.module.css';
import { useRouter } from 'next/navigation'
// import supabase from '@/app/lib/supabase';
import { ToastContainer, toast } from "react-toastify";
import {generateReport} from '@/app/lib/jsreportservice'


const StudentInvoice = ({ isOpen, onClose, closeModal, student }: { isOpen: any, onClose: any, closeModal: any, student:any }) => {
  function formatDate(date:any) {
    // Get month, day, and year
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
  
    // Return the formatted date
    return `${month}/${day}/${year}`;
  }

  console.log()  
  // Example usage
  const today = new Date();
  const formattedDate = formatDate(today);
 
  const router = useRouter()
  const [formData, setFormData] = useState({

    amount: '',
    student_id: student.id,
    date: formattedDate

  });
  

 
 
 
   const [errors, setErrors] = useState({
 
    amount: '',
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
  
      amount: '',
      address: '',
      phone_number: '',
      email: ''
     };
 
     // Form Validations
     if (!formData.amount) {
       newErrors.amount = 'Course fee is required';
     } 
     
 
    
 
 
 
     setErrors(newErrors);
 
    
     return Object.values(newErrors).every((error) => !error);
   };
 
  
 
 
   const handleSubmit = async (e:any) => {
     e.preventDefault();
 
    //  if (validateForm()) {
    //    try {

    //     const { data, error } = await supabase
    //     .from('student_invoices')
    //     .insert([formData])
        
  
    //   if (error) {
    //     throw error;
    //   }

    //   const updateResult = await supabase
    //   .from('students')
    //   .update({ is_student: true, status: "Enrolled" })
    //   .eq('student_id', formData.student_id);

    // if (updateResult.error) {
    //   throw updateResult.error;
    // }
      
    //   toast.success("Invoice generated successfully");
  
    //   // const timeoutId = setTimeout(() => {
    //   //   router.push('/dashboard/school/students');
    //   // }, 4000);
        
    //     // const handleGenerateReport =()=>{
    //     //   const data = {
    //     //     Invoice: {
    //     //       Name: formData.customer_name,
    //     //       Address: formData.address,
    //     //       Phone: formData.phone_number,
    //     //       Email: formData.email,
    //     //       InvoiceId: "INV-123",
    //     //       Date: formData.date,
    //     //       Price: student.price,
    //     //       Laptop: {
    //     //         Brand: student.brand,
    //     //         Model: student.model,
    //     //         Processor: student.processor,
    //     //         Ram: student.ram
  
    //     //       }
    //     //     }
    //     //   };
    //     //   generateReport(data)
       
    //     // }
    //     // handleGenerateReport()
    //      // const { data, error } = await supabase.from('students').insert([formData]).select();
         
 
 
    //    } catch (error:any) {
    //      console.error('Unexpected error:', error.message);
    //    }
       
    //  }
   };
 
   return (
     <>
      <ToastContainer 
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              draggable={false}
             
              closeOnClick
              pauseOnHover
         />
       {isOpen && (
         <div className={styles.modalOverlay} onClick={onClose}>
           <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
             <h2>Enrollment form</h2>
            
            <form onSubmit={handleSubmit}>
        
              <div className={styles.formGroup}>
                <label >Course fee</label>
                <input type="number" onChange={handleInputChange} value={formData.amount} name="amount" id="" />
                <span className={styles.error}>{errors.amount}</span>
             
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
 
 export default StudentInvoice;
 