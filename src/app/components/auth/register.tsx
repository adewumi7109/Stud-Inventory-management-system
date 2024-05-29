"use client"
import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import styles from './auth.module.css';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { register } from '@/app/utils/authApi'; // Import the registerApi function
import { useRouter } from 'next/navigation'; // Import useRouter hook from next/router
import AuthContext from '@/app/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const {signin, getUserName }:any = useContext(AuthContext);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [pError, setPErrors] = useState<string>('');
  const router = useRouter(); // Initialize useRouter

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear the error message when user starts typing again
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPErrors('');

    // Basic form validation
    const errors: Partial<FormData> = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please retype your password';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setErrors(errors);

    // If no errors, proceed with form submission
    if (Object.keys(errors).length === 0) {
      try {
        const response = await register(formData); // Use the registerApi function
        console.log('Registration successful!', response);
        alert("Registration successful! ")
        
        await signin({response})
      router.push("/dashboard")
      } catch (error:any) {
        console.error('Registration failed!', error);
        // Check if error.response.data.errors exists and has at least one element
        if (error.response && error.response.data.errors && error.response.data.errors.length > 0) {
          const description = error.response.data.errors[0].description;
          setPErrors(description);
        } else {
          setPErrors('An unknown error occurred.');
        }
      }
    }
  };

  return (
    <div className={inter.className}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Register</h1>
          <span className={styles.error}>{pError}</span>
         
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                name="email"
                className={styles.inputBox}
                id="email"
                value={formData.email}
                onChange={handleChange}
                aria-label="Your Email"
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                className={styles.inputBox}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                aria-label="Your Password"
              />
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Retype Password</label>
              <input
                type="password"
                className={styles.inputBox}
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                aria-label="Retype Password"
              />
              {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
            </div>
            <div className={styles.formGroup}>
              <span>Already a member? <Link href="/">Login</Link></span>
            </div>
            <div className={styles.formGroup}>
              <input type="submit" className={styles.submitBtn} value="Sign up" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
