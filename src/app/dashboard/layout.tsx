"use client"
import { useCallback, useContext, useEffect, useState } from 'react'
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Sidebar from '../components/dashboard/sidebar/sidebar'
import Navbar from '../components/dashboard/navbar/navbar'
import { Inter } from 'next/font/google'
import styles from '../components/dashboard/dashboard.module.css'
import { redirect } from 'next/navigation'
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from 'next/navigation'
import AuthContext from '@/app/context/AuthContext'
const inter = Inter({ subsets: ['latin'] })

  
export default  function DashboardLayout( 

  {
  
  children
}: {
  children: React.ReactNode
}) {
  
const [loading, setLoading] = useState(false);
useEffect(()=>{
  setLoading(true)
  setTimeout((()=>{
    setLoading(false)

  }),2000)
},[])
const {getUserName}:any = useContext(AuthContext);

const router = useRouter();

  useEffect(() => {
    if (!getUserName()) {
      router.push('/');
    }
  }, [getUserName()]);



  return  (
 
    <div className={inter.className}>
     {
      loading? <div className={styles.loader}><ClipLoader
      color={'#2e374a'}
      loading={loading}
      // cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    /></div>
      :
      <div className={styles.container}>
      <div className={styles.menu}>
     
          <Sidebar/>
      </div>
      <div className={styles.content}>
     
          <Navbar userName={getUserName}/>
           
          {children}
      </div>
  </div>
     }
    </div>
 


  )
}
