"use client";
import { useCallback, useContext, useEffect, useState } from 'react';
import Sidebar from '../components/dashboard/sidebar/sidebar';
import Navbar from '../components/dashboard/navbar/navbar';
import { Inter } from 'next/font/google';
import styles from '../components/dashboard/dashboard.module.css';
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from 'next/navigation';
import AuthContext from '@/app/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const { getUserName, isAuthLoading }: any = useContext(AuthContext); // Include isAuthLoading
  const router = useRouter();
  const [active, setActive] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer); // Clean up the timeout
  }, []);

  useEffect(() => {
    if (!isAuthLoading && !getUserName()) {
      router.push('/');
    }
  }, [getUserName, isAuthLoading, router]);

  const handleToggle = () =>{
    setActive(!active)
  }
  return (
    <div className={inter.className}>
      {loading ? (
        <div className={styles.loader}>
          <ClipLoader
            color={'#2e374a'}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={active? styles.menu : styles.rmenu }>
            <Sidebar handleToggle={handleToggle} />
          </div>
          <div className={styles.content}>
            <Navbar userName={getUserName} />
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
