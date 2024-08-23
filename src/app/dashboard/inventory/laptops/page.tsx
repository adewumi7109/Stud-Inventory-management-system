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
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5); 
  const [totalPages, setTotalPages] = useState(0);
  const [SearchQuery, setSearchQuery] = useState("")
 
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setReloadData(true);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { laptops, totalPages  }:any = await getAllLaptops(pageNumber, pageSize, SearchQuery);
        setLaptops(laptops);
        setTotalPages(totalPages);
        setReloadData(false);
      } catch (error) {
        // Handle error
      } finally{
        setLoading(false);
      }
    };

    getData();
  }, [reloadData , pageNumber, pageSize, SearchQuery]);
  
  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const modifiedLaptops = laptops.map((laptop: any) => ({
    ...(laptop as any),
    description: `${laptop?.brand} ${laptop?.model} - ${laptop?.ram} Ram, ${laptop?.storageSize} ${laptop?.storageType}`,
  }));
  




  return (
    <>
  
    <Laptoptable 
    closeModal={closeModal}
     isModalOpen={isModalOpen} 
     openModal={openModal} loading={loading}
      laptops={modifiedLaptops}
      pageNumber={pageNumber}
      totalPages={totalPages}
    searchQuery = {setSearchQuery}
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
      />
   
    </>
  );
}

export default Page;
