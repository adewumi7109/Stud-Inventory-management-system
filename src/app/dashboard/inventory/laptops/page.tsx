"use client"
import React, { useState, useEffect } from 'react';
import styles from '@/app/components/dashboard/laptops/laptops.module.css';
import Search from '@/app/components/dashboard/search/search';
import Link from 'next/link';
import Modal from '@/app/components/dashboard/laptops/modal/modal';
import Laptoptable from '@/app/components/dashboard/laptops/laptoptable/laptoptable';
// import Pagination from '@/app/ui/dashboard/pagination/pagination';
import 'react-toastify/dist/ReactToastify.css';
import RealtimeLoader from '@/app/components/loader/loader';
import { getAllLaptops } from '@/app/utils/laptopData';
import axios from 'axios'


function Page() {

  
  const [isModalOpen, setModalOpen] = useState(false);
  const [laptops, setLaptops] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setReloadData(true);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const data:any = await fetchData();
       
  //       console.log("data:", data);
  //       setLaptops(data);
  //       setReloadData(false);
  //     } catch (error:any) {
  //       console.error('Error setting students data:', error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [reloadData]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://localhost:7014/api/Laptops');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const jsonData = await response.json();
  //       console.log(jsonData)
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       // Handle error
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);


  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const fetchedData = await getAllLaptops();
        setLaptops(fetchedData);
        setReloadData(false);
      } catch (error) {
        // Handle error
      } finally{
        setLoading(false);
      }
    };

    getData();
  }, [reloadData]);
  

  // fetchData();
  

console.log("laptops:", laptops)



  return (
    <>
  
    <Laptoptable closeModal={closeModal} isModalOpen={isModalOpen} openModal={openModal} loading={loading} laptops={laptops}/>
   
    </>
  );
}

export default Page;
