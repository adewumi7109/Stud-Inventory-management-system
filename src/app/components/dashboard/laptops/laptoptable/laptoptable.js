import React from 'react'
import styles from '@/app/components/dashboard/laptops/laptops.module.css';
import RealtimeLoader from '@/app/components/loader/loader';
import Link from 'next/link';
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import Modal from '@/app/components/dashboard/laptops/modal/modal';
import Search from '@/app/components/dashboard/search/search';

const columns =[
    {
      accessorKey: 'serialNumber',
      header: 'Serial Number',
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'model',
      header: 'Model',
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'storageSize',
      header: 'Hardrive',
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: (props) => <p>{props.getValue()}</p>
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: () => <button className={styles.viewBtn}>View </button>
    },
  ]

function Laptoptable({laptops, loading, closeModal, isModalOpen, openModal}) {
    const table = useReactTable({
        columns, 
        data: laptops,
      
        getCoreRowModel:getCoreRowModel(),
        getPaginationRowModel:getPaginationRowModel()
      });
      console.log(table.getHeaderGroups())
  return (
    <div>
           <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search for laptop.." />
        
          <div>
            <button className={styles.addButton} onClick={openModal}>
              Add new laptop
            </button>
            <Modal isOpen={isModalOpen} closeModal={closeModal} onClose={closeModal} />
         
           
        
          </div>
        </div>
        
        <table className={styles.table}>
          {/* <thead>
            <tr className={styles.header}>
              <td>Serial Number</td>
              <td>Model</td>
              <td>Memory</td>
              <td>Price</td>
              <td>Action</td>
            </tr>
          </thead> */}
           <thead>
   {table.getHeaderGroups().map((headerGroup)=>(
      <tr className={styles.header} key={headerGroup.id}>
        {headerGroup.headers.map((header)=>(
          <td key={header.id}>
            {header.column.columnDef.header}
          </td>
        ))}
      </tr>
    ))}
   </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5}>
                  <RealtimeLoader />
                </td>
              </tr>
            ) : (
                table.getRowModel().rows.map(row=><tr key={row.id}> {
                    row.getVisibleCells().map(cell =><td key={cell.id}> <Link href={`/dashboard/inventory/laptops/${row.original.id}`}>
                    
                      {
                        flexRender(
                          cell.column.columnDef.cell,
                          
                          cell.getContext()
                        )
                      }
                      </Link>
                    </td>)
                  }
                  
                  </tr>)
            )}
          </tbody>
        </table>
         <div className={styles.paginationCont}>
         <div >
            {table.getState().pagination.pageIndex +1} of {" "}
            {table.getPageCount()}
          </div>
          <div className={styles.paginationBtns}>
            <button onClick={()=> table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >{"<"}</button>
            <button onClick={()=> table.nextPage()}
              disabled={!table.getCanNextPage()}

            >{">"}</button>
          </div>
         </div>
      </div>

    </div>
  )
}

export default Laptoptable