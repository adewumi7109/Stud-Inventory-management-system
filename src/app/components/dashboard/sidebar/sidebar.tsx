import React from 'react'
import MenuLink from './menuLink/menuLink'
import { AiOutlineLaptop } from "react-icons/ai";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlinePeople } from "react-icons/md";
import { FaChartBar, FaFileInvoice } from "react-icons/fa";
import styles from './sidebar.module.css'
import Link from 'next/link';
import { GiHamburgerMenu } from "react-icons/gi";

const menuItems = [

    {
        title: "School",
        list: [
            {
                title: "Students",
                path: "/dashboard/school/students",
                icon: <PiStudentBold />
            },
            {
                title: "Prospects",
                path: "/dashboard/school/prospects",
                icon: <MdOutlinePeople />
            },
            // {
            //     title: "Invoices",
            //     path: "/dashboard/school/invoices",
            //     icon: <FaFileInvoice />
            // }
        ]
    },
    {
        title: "Sales",
        list: [
            {
                title: "Laptop Inventory",
                path: "/dashboard/inventory/laptops",
                icon: <AiOutlineLaptop />,
            },
            {
                title: "Laptop invoices",
                path: "/dashboard/invoices/laptops",
                icon: <FaFileInvoice />,
            },
            // {
            //     title: "Student invoices",
            //     path: "/dashboard/invoices/students",
            //     icon: <FaFileInvoice />,
            // },
            // {
            //     title: "Invoices",
            //     path: "/dashboard/inventory/invoices",
            //     icon: <FaFileInvoice />,
            // }
        ]
    },
    // {
    //     title: "Vnicom Processes",
    //     list: [
           
    //         {
    //             title: "Payment Memo",
    //             path: "/dashboard/paymentmemo",
    //             icon: <FaFileInvoice />,
    //         }
    //     ]
    // }
]

function Sidebar({handleToggle}:any) {
   
    return (
     <>
        <div>
          <div className={styles.header}>
          <h1 style={{color: 'white', fontSize:"1.5rem"}}><Link href="/dashboard">Dashboard</Link></h1>
          {/* <GiHamburgerMenu onClick={handleToggle} className={styles.burger} />  */}
          </div>
            <ul className={styles.wrapper}>
                {menuItems.map((item) => (
                    <li key={item.title} className={styles.container}>
                        <span className={styles.title}>{item.title}</span>
                        {item.list.map((item) => (
                            <MenuLink item={item} key={item.title} />
                        ))}
                    </li>

                ))}
            
              
            </ul>
            
                         

        </div>
       
            
                   

               
           
     </>
    )
}

export default Sidebar