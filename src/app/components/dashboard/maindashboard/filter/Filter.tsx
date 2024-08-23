import React from 'react'
import styles from './filter.module.css'
function DashbordFilter() {
  return (
<div className={styles.wrapper}>
<div className={styles.cont}>
       <div className={styles.formControl}>
        <label htmlFor="">From</label>
      <input type="date" name="" id="" />
       </div>
       <div className={styles.formControl}>
        <label htmlFor="">To</label>
      <input type="date" name="" id="" />
       </div>
    </div>
</div>
  )
}

export default DashbordFilter