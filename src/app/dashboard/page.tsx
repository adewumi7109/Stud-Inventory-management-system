"use client"
import React, {useEffect, useState} from 'react'
import Chart from '../components/dashboard/chart/chart'
import Cards from '../components/dashboard/maindashboard/cards/cards'
import { useRouter } from 'next/navigation'
import Audittable from '../components/dashboard/maindashboard/audit_table/Audit'
import { getAudits } from '../utils/studentData'
import DashbordFilter from '../components/dashboard/maindashboard/filter/Filter'

function Dashboard() {
  const router = useRouter()
  const [audits, setAudits] = useState([])
  const [reloadData, setReloadData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5); 
  const [totalPages, setTotalPages] = useState(0);
  const [SearchQuery, setSearchQuery] = useState("")
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { audits, totalPages  }:any = await getAudits(pageNumber, pageSize, SearchQuery);
        setAudits(audits);
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

  return (
    <div>
      {/* <DashbordFilter/> */}
      <Cards/>

      <Audittable
       loading={loading}
       audits={audits}
       pageNumber={pageNumber}
       totalPages={totalPages}
     searchQuery = {setSearchQuery}
       handleNextPage={handleNextPage}
       handlePreviousPage={handlePreviousPage}
      />
      {/* <Chart/> */}
      
    </div>
  )
}

export default Dashboard