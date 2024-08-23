import React, { useState } from 'react';
import styles from '@/app/components/dashboard/laptops/laptops.module.css';
import RealtimeLoader from '@/app/components/loader/loader';
import Link from 'next/link';
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import Modal from '@/app/components/dashboard/students/modal/prospectmodal/prospectmodal';
import Search from '@/app/components/dashboard/students/prospect/search/search';

// Define columns with accessor keys
const columns = (loadingState, handleViewClick) => [
  {
    accessorKey: 'details',
    header: 'Details',
    cell: (props) => {
      const details = props.getValue();
      const [name, email] = details.split('-'); // Assuming email is separated by a dash
    
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <strong>{name}</strong>
          <span style={{ color: 'blue' }}>{email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'programs',
    header: 'Program',
    cell: (props) => {
      const programs = props.getValue();
      return (
        <div>
          {programs.map((program, index) => (
            <p className={styles.pTitles} key={index}>{program.title}</p>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'studentStatus',
    header: 'Status',
    cell: (props) => <p>{getStatusLabel(props.getValue())}</p> // Render status as string
  },
  {
    accessorKey: 'cohort',
    header: 'Cohort',
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: (props) => {
      const studentId = props.row.original.studentId;
      return (
        <button
          className={styles.viewBtn}
          onClick={() => handleViewClick(studentId)}
          disabled={loadingState[studentId]} // Disable the button while loading
        >
          {loadingState[studentId] ? 'Loading...' : 'View'}
        </button>
      );
    }
  },
];

// Function to map status number to string
const getStatusLabel = (status) => {
  switch (status) {
    case 0:
      return 'Enrolled';
    case 1:
      return 'Graduated';
    case 2:
      return 'Prospect';
    default:
      return '';
  }
};

function ProspectTable({
  searchQuery, 
  students, 
  loading, 
  closeModal, 
  isModalOpen, 
  openModal, 
  pageNumber, 
  totalPages, 
  handleNextPage, 
  handlePreviousPage 
}) {
  const [loadingState, setLoadingState] = useState({}); // Track loading states by studentId

  const handleViewClick = (studentId) => {
    // Set loading state to true for the clicked row
    setLoadingState((prev) => ({ ...prev, [studentId]: true }));

    // Simulate an async action (like fetching data or navigating)
    setTimeout(() => {
      // Example: Navigate to a detail page
      router.push(`/dashboard/school/prospects/${studentId}`);

      // After the action completes, set loading state back to false
      setLoadingState((prev) => ({ ...prev, [studentId]: false }));
    }, 2000); // Adjust delay as needed
  };

  const table = useReactTable({
    columns: columns(loadingState, handleViewClick), // Pass loadingState and handler to columns
    data: students,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.top}>
          <Search searchQuery={searchQuery} placeholder="Search for prospects" />
          <div>
            <button className={styles.addButton} onClick={openModal}>
              Add new prospect
            </button>
            <Modal isOpen={isModalOpen} closeModal={closeModal} onClose={closeModal} />
          </div>
        </div>
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
                      <Link href={`/dashboard/school/prospects/${row.original.studentId}`}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Link>
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
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

export default ProspectTable;
