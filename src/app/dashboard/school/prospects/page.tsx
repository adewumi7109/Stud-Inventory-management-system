"use client"
import Prospecttable from '@/app/components/dashboard/students/prospect/prospect_table'
import React, {useState, useEffect} from 'react'
import RealtimeLoader from '@/app/components/loader/loader'
import { getAllProspects } from '@/app/utils/studentData'
function page() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [students, setStudents] = useState([])
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
    const getData = async () => {
      try {
        setLoading(true);
        const fetchedData = await getAllProspects();
        setStudents(fetchedData);
        setReloadData(false);
      } catch (error) {
        // Handle error
      } finally{
        setLoading(false);
      }
    };

    getData();
  }, [reloadData]);
  


  const modifiedStudents = students.map((student: any) => ({
    ...(student as any),
    details: `${student.firstname} ${student.lastname}-${student.email}`,
  }));

 
  return (
    <>
    <Prospecttable closeModal={closeModal} isModalOpen={isModalOpen} openModal={openModal} loading={loading} students={modifiedStudents}/>

  
    </>
  )
}

export default page