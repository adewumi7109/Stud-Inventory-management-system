"use client"
import React, { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react';
import styles from './auth.module.css';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { login } from '@/app/utils/authApi';
import AuthContext from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
const inter = Inter({ subsets: ['latin'] });

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
    const router = useRouter();
    const {signin, getUserName }:any = useContext(AuthContext);
    useEffect(() => {
        if (getUserName()) {
          router.push('/dashboard');
        }
      }, [getUserName()]);
    const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [pError, setPErrors] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if email or password is empty
    if (!formData.email) {
      setPErrors('Please input email');
      return;
    }
    if (!formData.password) {
      setPErrors('Please input password');
      return;
    }

    try {
      setPErrors('');
      const response = await login(formData);
      await signin({response})
      router.push("/dashboard")
      
      
    } catch (error:any) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("Error:", error.response.data.message);
        setPErrors(error.response.data.message);
      } else {
        console.error('Login failed!', error);
        setPErrors(error?.message);
      }
    }
  };

  return (
    <div className={inter.className}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <h1 className={styles.title}>Login</h1>
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
              <span className={styles.error}>{pError}</span>
            </div>
            <div className={styles.formGroup}>
              <span>Not registered? <Link href="/signup">Create an account</Link></span>
            </div>
            <div className={styles.formGroup}>
              <input type="submit" className={styles.submitBtn} value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

