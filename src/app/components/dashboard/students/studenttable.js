import React, { useState } from 'react';
import styles from '@/app/components/dashboard/laptops/laptops.module.css';
import RealtimeLoader from '@/app/components/loader/loader';
import Link from 'next/link';
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import Modal from '@/app/components/dashboard/students/modal/modal';
import Search from '@/app/components/dashboard/students/search';

const Studenttable = ({ searchQuery, students, loading, closeModal, isModalOpen, openModal, pageNumber, totalPages, handleNextPage, handlePreviousPage }) => {
  // State to manage loading for individual "View" buttons
  const [loadingStates, setLoadingStates] = useState(Array(students.length).fill(false));

  // Function to handle the "View" button click
  const handleViewClick = async (rowIndex) => {
    const updatedLoadingStates = [...loadingStates];
    updatedLoadingStates[rowIndex] = true;
    setLoadingStates(updatedLoadingStates);

    try {
      // Simulate an async operation (like API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Perform your action here (like navigating or fetching data)
      console.log(`Viewing student with ID: ${students[rowIndex].studentId}`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      updatedLoadingStates[rowIndex] = false;
      setLoadingStates(updatedLoadingStates);
    }
  };

  // Define columns with accessor keys
  const columns = [
    {
      accessorKey: 'details',
      header: 'Details',
      cell: (props) => {
        const details = props.getValue();
        const [name, email] = details.split('-');
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
      cell: (props) => <p>{getStatusLabel(props.getValue())}</p>, // Render status as string
    },
    {
      accessorKey: 'cohort',
      header: 'Cohort',
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: (props) => {
        const rowIndex = props.row.index;
        return (
          <button
            className={styles.viewBtn}
            onClick={() => handleViewClick(rowIndex)}
            disabled={loadingStates[rowIndex]} // Disable button while loading
          >
            {loadingStates[rowIndex] ? "Loading..." : "View"}
          </button>
        );
      },
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

  const table = useReactTable({
    columns,
    data: students,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.top}>
          <Search searchQuery={searchQuery} placeholder="Search for Students.." />
          <div>
            <button className={styles.addButton} onClick={openModal}>
              Add new student
            </button>
            <Modal isOpen={isModalOpen} closeModal={closeModal} onClose={closeModal} />
          </div>
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
                      <Link href={`/dashboard/school/students/${row.original.studentId}`}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Link>
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
};

export default Studenttable;
