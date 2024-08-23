import React, { useState } from 'react';
import styles from './modal.module.css';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { generateLaptopInvoice, updateLaptop } from '@/app/utils/laptopData';

interface Laptop {
  id: number;
  brand: string;
  model: string;
  processor: string;
  ram: string;
  storageSize: string;
  storageType: string;
  serialNumber: string;
  processorSpeed: string;
  price: number;
  isAvailable: boolean;
}

interface LaptopInvoiceProps {
  isOpen: boolean;
  onClose: () => void;
  closeModal: () => void;
  laptop: Laptop;
}

interface FormErrors {
  customerName: string;
  address: string;
  phone: string;
  email: string;
}

const LaptopInvoice: React.FC<LaptopInvoiceProps> = ({
  isOpen,
  onClose,
  closeModal,
  laptop,
}) => {
  const formatDate = (date: Date): string => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const router = useRouter();
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    phone: '',
    email: '',
    id: laptop.id,
    date: formatDate(new Date()),
  });

  const [errors, setErrors] = useState<FormErrors>({
    customerName: '',
    address: '',
    phone: '',
    email: '',
  });

  // State to track loading state
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      customerName: '',
      address: '',
      phone: '',
      email: '',
    };

    if (!formData.customerName) newErrors.customerName = 'Fullname is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.email) newErrors.email = 'Email is required';

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true); // Start loading

      try {
        const data = {
          name: formData.customerName,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          invoiceNumber: '',
          date: '',
          price: new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(laptop.price),
          laptop: {
            brand: laptop.brand,
            model: laptop.model,
            processor: laptop.processor,
            ram: laptop.ram,
            storageSize: laptop.storageSize,
            storageType: laptop.storageType,
            serialNumber: laptop.serialNumber,
            processorSpeed: laptop.processorSpeed,
            gpuSize: '',
            isAvailable: false,
            batchId: 0,
            price: laptop.price,
          },
          laptopId: laptop.id,
        };

        console.log(data);
        await updateLaptop(laptop.id, { ...laptop, isAvailable: false });
        toast.success('Laptop purchased successfully');
        const pdfBlob:any = await generateLaptopInvoice(data);
        // const pdfUrl = URL.createObjectURL(pdfBlob);

        // Additional actions (e.g., download the PDF) can go here
      } catch (error) {
        console.error('An error occurred while generating the invoice:', error);
        toast.error('An error occurred. Please try again.');
      } finally {
        setIsLoading(false); // Stop loading after completion
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
            <h2>Customer Info</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Fullname</label>
                <input
                  type="text"
                  onChange={handleInputChange}
                  value={formData.customerName}
                  name="customerName"
                />
                <span className={styles.error}>{errors.customerName}</span>
              </div>
              <div className={styles.formGroup}>
                <label>Address</label>
                <input
                  type="text"
                  onChange={handleInputChange}
                  value={formData.address}
                  name="address"
                />
                <span className={styles.error}>{errors.address}</span>
              </div>
              <div className={styles.formGroup}>
                <label>Number</label>
                <input
                  type="number"
                  onChange={handleInputChange}
                  value={formData.phone}
                  name="phone"
                />
                <span className={styles.error}>{errors.phone}</span>
              </div>
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  name="email"
                />
                <span className={styles.error}>{errors.email}</span>
              </div>

              <div className={styles.formGroup}>
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Generating...' : 'Print'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LaptopInvoice;
