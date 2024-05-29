"use client"
import React, { useState, useEffect } from 'react';
import styles from '@/app/components/dashboard/laptops/laptops.module.css';
import Search from '@/app/components/dashboard/search/search';
import Link from 'next/link';
import Modal from '@/app/components/dashboard/laptops/modal/modal';
import LaptopInvoicesTable from '@/app/components/dashboard/invoices/laptop';
// import Pagination from '@/app/ui/dashboard/pagination/pagination';
import 'react-toastify/dist/ReactToastify.css';
import { getAllLaptopInvoices } from '@/app/utils/laptopData';
import RealtimeLoader from '@/app/components/loader/loader';



function Page() {

  
  const [isModalOpen, setModalOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setReloadData(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        var data = await getAllLaptopInvoices()
        // const { data, error }:{data:any, error:any} = await supabase.from('invoices').select('*');
   
        setInvoices(data);
        setReloadData(false);
      } catch (error:any) {
        console.error('Error setting students data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reloadData]);





  return (
    <>
    <LaptopInvoicesTable  loading={loading} invoices={invoices}/>
   
    </>
  );
}

export default Page;
 