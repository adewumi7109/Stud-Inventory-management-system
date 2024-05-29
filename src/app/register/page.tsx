"use client"
import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'

function RegistrationPage() {

  return (
    <div className={styles.container}>
      
      <form action="">
      <h1>Register</h1>
        <div className={styles.formGroup}>
          <label htmlFor="">Email:</label>
          <input type="text" name="" id="" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="">Password:</label>
          <input type="password" name="" id="" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="">Retype Password:</label>
          <input type="password" name="" id="" />
        </div>
        <Link  href='/'>Already have an account?<span className={styles.link}> Sign in</span> </Link>

     <input type="submit" value="Login" />
        
      </form>
    </div>
  )
}

export default RegistrationPage