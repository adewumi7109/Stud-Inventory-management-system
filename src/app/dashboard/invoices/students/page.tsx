"use client"
import React, { useState, useEffect } from 'react';
import styles from '@/app/ui/dashboard/laptops/laptops.module.css';
import Search from '@/app/components/dashboard/search/search';
import Link from 'next/link';
import Modal from '@/app/components/dashboard/laptops/modal/modal';
import StudentInvoicesTable from '@/app/components/dashboard/invoices/student';
// import Pagination from '@/app/ui/dashboard/pagination/pagination';
import 'react-toastify/dist/ReactToastify.css';
import { getAllStudentInvoices } from '@/app/utils/invoiceData';
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
        var data = await getAllStudentInvoices()
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
    <StudentInvoicesTable  loading={loading} invoices={invoices}/>
   
    </>
  );
}

export default Page;
 