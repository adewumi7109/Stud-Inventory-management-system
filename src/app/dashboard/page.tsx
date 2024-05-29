"use client"
import React, {useEffect} from 'react'
import Chart from '../components/dashboard/chart/chart'

import { useRouter } from 'next/navigation'


function Dashboard() {
  const router = useRouter()


  return (
    <div>
      <Chart/>
      
    </div>
  )
}

export default Dashboard