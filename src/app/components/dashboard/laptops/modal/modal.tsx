import { useState } from 'react';
import styles from './modal.module.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storeLaptop, checkSerialNumber } from '@/app/utils/laptopData';
import axios from 'axios';

const Modal = ({ isOpen, onClose, closeModal, refreshTable }: { isOpen: any, onClose: any, closeModal: any, refreshTable: any }) => {
  const [formData, setFormData] = useState({
    serialNumber: '',
    model: '',
    storageSize: '',
    brand: '',
    storageType: '',
    ram: '',
    gpuSize: '',
    price: '',
    processor: '',
    processorSpeed: '',
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

    // Example validation for storageSize
    if (!formData.storageSize) {
      newErrors.storageSize = 'Storage size is required';
    }
    if (!formData.storageType) {
      newErrors.storageType = 'Storage Type is required';
    }
    // Validation for other fields
    if (!formData.serialNumber) {
      newErrors.serialNumber = 'Serial Number is required';
    }

    if (!formData.brand) {
      newErrors.brand = 'Brand  is required';
    }
    if (!formData.processor) {
      newErrors.processor = 'Processor  is required';
    }
    if (!formData.processorSpeed) {
      newErrors.processorSpeed = 'Processor speed is required';
    }

    if (!formData.model) {
      newErrors.model = 'Model is required';
    }
    if (!formData.price) {
      newErrors.price = 'Price is required';
    }
    if (!formData.ram) {
      newErrors.ram = 'RAM is required';
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Check if the serial number already exists
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
  
        // If the serial number doesn't exist, proceed with submitting the form
        await storeLaptop(formData);
        toast.success('Laptop added successfully');
        closeModal();
     
      } catch (error) {
        console.error('Error submitting form data:', error);
      }
    }
  };
  

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
            <h2>New Laptop</h2>
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
                    <option value=""></option>
                    <option value="HP">HP</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Dell">Dell</option>
                  </select>
                  <span className={styles.error}>{errors.brand}</span>
                </div>
                <div className={styles.formGroup}>
                  <label>Processor</label>
                  <select name="processor" value={formData.processor} onChange={handleInputChange}>
                    <option value=""></option>
                    <option value="Intel Core i5">Intel Core i5</option>
                    <option value="Intel Core i3">Intel Core i3</option>
                    <option value="Intel Core i7">Intel Core i7</option>
                    <option value="Intel Pentium">Pentium</option>
                    <option value="Intel">Intel</option>
                    <option value="Amd">Amd</option>
                  </select>
                  <span className={styles.error}>{errors.processor}</span>
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.formGroup}>
                  <label>Processor Speed</label>
                  <select name="processorSpeed" value={formData.processorSpeed} onChange={handleInputChange}>
                    <option value=""></option>
                    <option value="2.0GHz">2.0GHz</option>
                    <option value="2.1GHz">2.1GHz</option>
                    <option value="2.2GHz">2.2GHz</option>
                    <option value="2.3GHz">2.3GHz</option>
                    <option value="2.4GHz">2.4GHz</option>
                    <option value="2.5GHz">2.5GHz</option>
                  </select>
                  <span className={styles.error}>{errors.processorSpeed}</span>
                </div>
                <div className={styles.formGroup}>
                  <label>Storage Type</label>
                  <select name="storageType" value={formData.storageType} onChange={handleInputChange}>
                    <option value=""></option>
                    <option value="SSD">SSD</option>
                    <option value="HDD">HDD</option>
                  </select>
                  <span className={styles.error}>{errors.storageType}</span>
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.formGroup}>
                  <label>Storage Size</label>
                  <select name="storageSize" value={formData.storageSize} onChange={handleInputChange}>
                    <option value=""></option>
                    <option value="500GB">500GB</option>
                    <option value="256GB">256GB</option>
                    <option value="128GB">128GB</option>
                    <option value="1T">1T</option>
                  </select>
                  <span className={styles.error}>{errors.storageSize}</span>
                </div>
                <div className={styles.formGroup}>
                  <label>Ram</label>
                  <select name="ram" value={formData.ram} onChange={handleInputChange}>
                    <option value=""></option>
                    <option value="2GB">2GB</option>
                    <option value="4GB">4GB</option>
                    <option value="8GB">8GB</option>
                    <option value="16GB">16GB</option>
                    <option value="32GB">32GB</option>
                  </select>
                  <span className={styles.error}>{errors.ram}</span>
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.formGroup}>
                  <label>GPU Size</label>
                  <input type="text" name="gpuSize" value={formData.gpuSize} onChange={handleInputChange} />
                </div>
                <div className={styles.formGroup}>
                  <label>Price</label>
                  <input type="number" placeholder='₦' name="price" value={formData.price} onChange={handleInputChange} />
                  <span className={styles.error}>{errors.price}</span>
                </div>
              </div>
              <div className={styles.btns}>
                <button onClick={closeModal}>Close</button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
