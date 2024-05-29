"use client"
import React from 'react'
import './menuLink.module.css'
import Link from 'next/link'
import styles from './menuLink.module.css'
import { usePathname } from 'next/navigation'
import Sidebar from '../sidebar'

function MenuLink({item}:{item: any }  ) {

  const pathname = usePathname();
  return (
    <Link  className={`${styles.container} ${item.path === pathname && styles.active}`} href={item.path}>
        {item.icon}
        {item.title}
    </Link>
  )
}

export default MenuLink