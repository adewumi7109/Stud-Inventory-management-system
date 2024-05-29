"use client"

import styles from './navbar.module.css'
import { usePathname } from 'next/navigation'
import { MdNotifications } from "react-icons/md"
import Image from 'next/image'
import { useState } from 'react'
import { useContext } from 'react'
import AuthContext from '@/app/context/AuthContext'


// import style from '../'


function Navbar({userName}:any) {
  const {logout}:any = useContext(AuthContext);



  const pathname = usePathname();
  return (
    <div className={styles.container}>
      <div>
        <span className={styles.pathname}>{pathname.slice(1).replaceAll('/', ' / ')}</span>

        
      </div>
     
      <div className={styles.user}>
      <span style={{fontSize: '.7rem'}}>Welcome back  {userName()}  </span>
      <button onClick={logout} className={styles.button}>Logout</button>
        <Image className={styles.profile} alt='profile' src='/avatar-1.jpg' width={40} height={40}  />
      </div>
    </div>
  )
}

export default Navbar