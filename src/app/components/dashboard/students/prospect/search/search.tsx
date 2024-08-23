import React from 'react'
import styles from './search.module.css'
import { MdSearch } from 'react-icons/md'

function Search({placeholder, searchQuery}:{placeholder:any, searchQuery:any}) {
  const handleChange = (e:any)=>{
    searchQuery(e.target.value) 
    // console.log(e.target.value)
  }
  return (
    <div className={styles.container}>
      <MdSearch/>
      <input type="text" onChange={handleChange} placeholder={placeholder}  className={styles.input}/>
    </div>
  )
}

export default Search