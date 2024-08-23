"use client"
import React, {useState, useEffect} from 'react'
import RealtimeLoader from '@/app/components/loader/loader'
import Studenttable from '@/app/components/dashboard/students/studenttable'
import { getAllStudents } from '@/app/utils/studentData'
function Page() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [students, setStudents] = useState([])
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
        const { students, totalPages  }:any = await getAllStudents(pageNumber, pageSize, SearchQuery);
        setStudents(students);
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


  const modifiedStudents = students.map((student: any) => ({
    ...(student as any),
    details: `${student.firstname} ${student.lastname}-${student.email}`,
  }));

 
  return (
    <>
     <Studenttable
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        openModal={openModal}
        loading={loading}
        students={modifiedStudents}
        pageNumber={pageNumber}
        totalPages={totalPages}
      searchQuery = {setSearchQuery}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </>
  )
}

export default Page