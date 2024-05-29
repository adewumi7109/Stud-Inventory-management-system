import { useState, useEffect } from 'react';
import styles from '../modal.module.css';
// import supabase from '@/app/lib/supabase';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation'
import { updateStudent } from '@/app/utils/studentData';


const UpdateStudentModal = ({ isOpen, onClose, closeModal, student }: { isOpen: any, onClose: any, closeModal: any, student:any }) => {
   const router = useRouter()

  const [formData, setFormData] = useState({
    studentStatus: parseInt(student.studentStatus),
    firstname: student.firstname,
    lastname: student.lastname,
    email: student.email,
    phone: student.phone,
    location: student.location,
    cohort: student.cohort,
    deliveryType: student.deliveryType,
    program: student.program,
    programIds: student.programs.map((p:any)=> { return p.programId})
    
  });

console.log(formData)
 
  const [errors, setErrors] = useState({
    studentStatus: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    location: '',
    cohort: '',
    deliveryType: '',
    program: '',
    // programIds: ''
  });

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    const parsedValue = name === 'studentStatus' ? parseInt(value) : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        // programIds: [...prevData.programIds, parseInt(value)] // Add to programIds array
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        // programIds: prevData.programIds.filter((id: number) => id !== parseInt(value)) // Remove from programIds array
      }));
    }
  };



  const validateForm = () => {
    const newErrors = {
      studentStatus: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      location: '',
      cohort: '',
      deliveryType: '',
      program: '',
      programIds: ''
    };
    // Form Validations
 

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

   

    if (!formData.firstname) {
      newErrors.firstname = 'First name is required';
    }

    if (!formData.lastname) {
      newErrors.lastname = 'lastname is required';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }
    if (!formData.cohort) {
      newErrors.cohort = 'Cohort is required';
    }
    if (!formData.deliveryType) {
      newErrors.deliveryType = 'Delivery type is required';
    }
    // if (formData.programIds.length === 0) {
    //   newErrors.programIds = 'At least one program must be selected';
    // }
  
    


    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const isValidEmail = (email:any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };



  const handleSubmit = async (e:any) => {
    e.preventDefault();
   
    if (validateForm()) {
       
      // console.log("data: ",formData)
     
      try {
        await updateStudent(student.studentId, formData); 
        toast.success("Student updated successfully");
        closeModal();
        setTimeout(() => {
          router.push("/dashboard/school/prospects");
        }, 3000);
      } catch (error) {
        console.error('Error updating Student:', error);
      } 
    }
  };

  return (
    <>
     {/* <ToastContainer 
             position="top-right"
             autoClose={3000}
             hideProgressBar={false}
             newestOnTop={false}
             draggable={false}
            
             closeOnClick
             pauseOnHover
        /> */}
      {isOpen && (
       <div className={styles.modalOverlay} onClick={onClose}>
       <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
         <h2>Update Prospect</h2>
         <form onSubmit={handleSubmit}>
         <div className={styles.col}>
           <div className={styles.formGroup}>

           <label>Status</label>
             <select name="studentStatus" value={formData.studentStatus} onChange={handleInputChange}>
  
             <option value="2">Prospect</option>
             </select>
             <span className={styles.error}>{errors.studentStatus}</span>

           </div>
           <div className={styles.formGroup}>
               <label>Delivery Type</label>
               <select name="deliveryType" value={formData.deliveryType} onChange={handleInputChange}>
                 <option value="">Select delivery type</option>
                 <option value="In-class">In-class</option>
                 <option value="Online">Online</option>
               </select>
               <span className={styles.error}>{errors.deliveryType}</span>
             </div>
           </div>

           <div className={styles.col}>
             <div className={styles.formGroup}>
               <label>Firstname</label>
               <input type="text" name="firstname" value={formData.firstname} onChange={handleInputChange} />
               <span className={styles.error}>{errors.firstname}</span>
             </div>
             <div className={styles.formGroup}>
               <label>Lastname</label>
               <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange} />
               <span className={styles.error}>{errors.lastname}</span>
             </div>
           </div>

           <div className={styles.col}>
             <div className={styles.formGroup}>
               <label>Email</label>
               <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
               <span className={styles.error}>{errors.email}</span>
             </div>
             <div className={styles.formGroup}>
               <label>Phone No:</label>
               <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
               <span className={styles.error}>{errors.phone}</span>
             </div>
           </div>

           <div className={styles.col}>
             <div className={styles.formGroup}>
               <label>Location</label>
               <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
               <span className={styles.error}>{errors.location}</span>
             </div>
             <div className={styles.formGroup}>
               <label>Cohort </label>
               <input type="text" name="cohort" value={formData.cohort} onChange={handleInputChange} />
               <span className={styles.error}>{errors.cohort}</span>
             </div>
           </div>

           {/* <div className={styles.col}>
           
             
            
           </div> */}
           {/* <div>
             <div className={styles.program}>Program: </div>
           <span className={styles.error}>{errors.programIds}</span>

             <div className={styles.checkbox} >
               <input type="checkbox" value="4" id="frontend" name="frontend" onChange={handleCheckboxChange} />
               <label htmlFor="frontend">Frontend Web Development</label>
             </div>
             <div className={styles.checkbox} >
             <input type="checkbox" value="3" id="design" name="design" onChange={handleCheckboxChange}  />
             <label htmlFor="design">Graphics & Product Design</label>
         </div>
         <div className={styles.checkbox} >
             <input type="checkbox" value="1" id="backend" name="backend"  onChange={handleCheckboxChange} />
             <label htmlFor="backend">Backend Web Development</label>
         </div>
         <div className={styles.checkbox} >
             <input type="checkbox" value="2" id="fullstack" name="fullstack" onChange={handleCheckboxChange} />
             <label htmlFor="fullstack">Fullstack Development</label>
         </div>
         <div className={styles.checkbox} >
             <input type="checkbox" value="6" id="datascience" name="datascience" onChange={handleCheckboxChange} />
             <label htmlFor="datascience">Data Science</label>
         </div>
         <div className={styles.checkbox} >
             <input type="checkbox" value="5" id="python" name="python" onChange={handleCheckboxChange} />
             <label htmlFor="python">Python Development</label>
         </div>
         <div className={styles.checkbox} >
             <input type="checkbox" value="7" id="mobile" name="mobile" onChange={handleCheckboxChange} />
             <label htmlFor="mobile">Mobile App Development</label>
         </div>
           </div> */}

           <div className={styles.btns}>
             <button onClick={closeModal}>Close </button>
             <button type="submit">Save</button>
           </div>
         </form>
       </div>
     </div>
      )}
    </>
  );
};

export default UpdateStudentModal;
