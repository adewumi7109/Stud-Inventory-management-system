import React from 'react';
import styles from './audits.module.css';
import RealtimeLoader from '@/app/components/loader/loader';
import Link from 'next/link';
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import Search from './search/search';
// Define columns with accessor keys
const columns = [
  
  {
    accessorKey: 'timestamp',
    header: 'Time',
    cell: (props) => <p>{props.getValue().split("T")[0]}</p> // Render status as string
  },
  {
    accessorKey: 'details',
    header: 'Details',
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: (props) => <p>{props.getValue()}</p>
  },
];



function Audittable({searchQuery, audits, loading, pageNumber, totalPages, handleNextPage, handlePreviousPage }) {
  const table = useReactTable({
    columns,
    data: audits,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });
 

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.top}>
          <Search searchQuery={searchQuery} placeholder="Search for Audits.." />
          {/* <div>
            <button className={styles.addButton} onClick={openModal}>
              Add new student
            </button>
            <Modal isOpen={isModalOpen} closeModal={closeModal} onClose={closeModal} />
          </div> */}
        </div>
        <div style={{overflowX: 'auto'}}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className={styles.header} key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
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
              table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
        <div className={styles.paginationCont}>
          <div>
            {pageNumber} of {totalPages}
          </div>
          <div className={styles.paginationBtns}>
            <button onClick={handlePreviousPage} disabled={pageNumber <= 1}>{"<"}</button>
            <button onClick={handleNextPage} disabled={pageNumber >= totalPages}>{">"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Audittable;
