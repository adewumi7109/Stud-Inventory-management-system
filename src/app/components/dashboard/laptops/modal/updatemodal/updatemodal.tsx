import { useState } from 'react';
import styles from '../modal.module.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation'
import {  checkSerialNumber, updateLaptop } from '@/app/utils/laptopData';
import axios from 'axios';

const UpdateLaptopModal = ({ isOpen, onClose, closeModal, laptop }: { isOpen: any, onClose: any, closeModal: any, laptop: any }) => {
  const router = useRouter()
 

  const [formData, setFormData] = useState({
    serialNumber: laptop.serialNumber,
    model: laptop.model,
    storageSize: laptop.storageSize,
    brand: laptop.brand,
    storageType: laptop.storageType,
    ram: laptop.ram,
    gpuSize: laptop.gpuSize,
    price: laptop.price,
    processor: laptop.processor,
    processorSpeed: laptop.processorSpeed,
    isAvailable: true
  });

  const [errors, setErrors] = useState({
    serialNumber: '',
    model: '',
    storageSize: '',
    brand: '',
    storageType: '',
    ram: '',
    gpuSize: '',
    price: '',
    processor: '',
    processorSpeed: ''
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    // Regular expression to allow only numbers and alphabets
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;

    // Check if the input value matches the allowed pattern
    if (name === 'serialNumber' && !alphanumericRegex.test(value)) {
      // If not, display an error message and clear the entire input value
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'Only numbers and alphabets are allowed',
      }));

      // Clear the entire input value
      setFormData((prevData) => ({
        ...prevData,
        [name]: '',
      }));

      return;
    }

    // Update the state with the valid input value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the error message for the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {
      serialNumber: '',
      model: '',
      storageSize: '',
      brand: '',
      storageType: '',
      ram: '',
      gpuSize: '',
      price: '',
      processor: '',
      processorSpeed: ''
    };

    // Form Validations
    if (!formData.storageSize) {
      newErrors.storageSize = 'storageSize is required';
    }
    if (!formData.storageType) {
      newErrors.storageType = 'Storage Type is required';
    }

    if (!formData.serialNumber) {
      newErrors.serialNumber = 'Serial Number is required';
    }

    if (!formData.brand) {
      newErrors.brand = 'Brand  is required';
    }

    if (!formData.model) {
      newErrors.model = 'model is required';
    }
    if (!formData.processor) {
      newErrors.processor = 'Processor is required';
    }
    if (!formData.price) {
      newErrors.price = 'Price is required';
    }
    if (!formData.ram) {
      newErrors.ram = 'Ram is required';
    }
    if (!formData.processorSpeed) {
      newErrors.processorSpeed = 'Processor speed is required';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    if (validateForm()) {
      if (formData.serialNumber !== laptop.serialNumber) {
        // Check if the serial number is different from the initial serial number
        try {
          const response = await checkSerialNumber(formData.serialNumber);
       
          console.log("SERIAL No: ", response)
          if (response?.serialNum == true) {
            alert("Serial number already exists")
            setErrors((prevErrors) => ({
              ...prevErrors,
              serialNumber: 'Serial number already exists',
            }));
            return; 
          }
        } catch (error) {
          console.error('Error checking serial number:', error);
          return; // Stop further processing if there's an error
        }
      }
  
      try {
        await updateLaptop(laptop.id, formData); // Use the updateLaptop function to send a PUT request
        toast.success("Laptop updated successfully");
        closeModal();
        setTimeout(() => {
          router.push("/dashboard/inventory/laptops");
        }, 5000);
      } catch (error) {
        console.error('Error updating laptop:', error);
      } 
    }
  };
  

  // Select arrays
  const brandOptions = ["Lenovo", "Hp", "Dell"];
  const processorOptions = ["Intel Core i5", "Intel Core i3", "Intel Core i7", "Intel Pentium", "Intel", "Amd"];
  const processorSpeedOptions = ["2.0GHz", "2.1GHz", "2.2GHz", "2.3GHz", "2.4GHz", "2.5GHz"];
  const storageTypeOptions = ["SSD", "HDD"];
  const storageSizeOptions = ["500GB", "256GB", "128GB", "1T"];
  const ramOptions = ["2GB", "4GB", "8GB", "16GB", "32GB"];

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
            <h2>Update Laptop</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.col}>
                <div className={styles.formGroup}>
                  <label>Serial Number</label>
                  <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleInputChange} />
                  <span className={styles.error}>{errors.serialNumber}</span>
                </div>
                <div className={styles.formGroup}>
                  <label>Model</label>
                  <input type="text" name="model" value={formData.model} onChange={handleInputChange} />
                  <span className={styles.error}>{errors.model}</span>
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.formGroup}>
                  <label>Brand</label>
                  <select name="brand" value={formData.brand} onChange={handleInputChange}>
                    {brandOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <span className={styles.error}>{errors.brand}</span>
                </div>
                <div className={styles.formGroup}>
                  <label>Processor</label>
                  <select name="processor" value={formData.processor} onChange={handleInputChange}>
                    {processorOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <span className={styles.error}>{errors.processor}</span>
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.formGroup}>
                  <label>Processor Speed</label>
                  <select name="processorSpeed" value={formData.processorSpeed} onChange={handleInputChange}>
                    {processorSpeedOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <span className={styles.error}>{errors.processorSpeed}</span>
                </div>
                <div className={styles.formGroup}>
                  <label>Storage Type</label>
                  <select name="storageType" value={formData.storageType} onChange={handleInputChange}>
                    {storageTypeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <span className={styles.error}>{errors.storageType}</span>
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.formGroup}>
                  <label>Storage Size</label>
                  <select name="storageSize" value={formData.storageSize} onChange={handleInputChange}>
                    {storageSizeOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <span className={styles.error}>{errors.storageSize}</span>
                </div>
                <div className={styles.formGroup}>
                  <label>Ram</label>
                  <select name="ram" value={formData.ram} onChange={handleInputChange}>
                    {ramOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <span className={styles.error}>{errors.ram}</span>
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.formGroup}>
                  <label>GPU Size </label>
                  <input type="text" name="gpuSize" value={formData.gpuSize} onChange={handleInputChange} />
                  {/* <span className={styles.error}>{errors.cohort}</span> */}
                </div>
                <div className={styles.formGroup}>
                  <label>Price </label>
                  <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
                  <span className={styles.error}>{errors.price}</span>
                </div>
              </div>
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

export default UpdateLaptopModal;
