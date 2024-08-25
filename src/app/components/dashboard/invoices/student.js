import React, { useState } from 'react';
import styles from '@/app/components/dashboard/laptops/laptops.module.css';
import RealtimeLoader from '@/app/components/loader/loader';
import Link from 'next/link';
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import Modal from '@/app/components/dashboard/laptops/modal/modal';
import Search from '@/app/components/dashboard/search/search';
import { FaPrint } from 'react-icons/fa';
import { generateReport } from '@/app/lib/jsreportservice';

const StudentInvoicesTable = ({ invoices, loading }) => {
  console.log(invoices)
  const handleGenerateReport = (invoiceId) => {
    const invoice = invoices.find(invoice => invoice.invoiceId === invoiceId);
    const data = {
      Invoice: {
        Name: invoice.customerName,
        Address: invoice.address,
        Phone: invoice.phone,
        Email: invoice.email,
        InvoiceId: invoice.invoiceId,
        Date: invoice.createdAt,
        Price: invoice.laptop.price,
        Laptop: {
          Brand: invoice.laptop.brand,
          Model: invoice.laptop.model,
          Processor: invoice.laptop.processor,
          Ram: invoice.laptop.ram,
          Storage: invoice.laptop.storageSize,
          StorageType: invoice.laptop.storageType,
          SerialNumber: invoice.laptop.serialNumber,
          Processor_speed: invoice.laptop.processorSpeed,
        }
      }
    };
    generateReport(data);
  }

  const columns = [
    {
      accessorKey: 'invoices',
      header: 'Date',
      cell: (props) => {
        const programs = props.getValue();
        return (
          <div>
         
         {programs.slice(0, 1).map((program, index) => (
              <p className={styles.pTitles} key={index}>{program.date}</p>
            ))}
        
          </div>
        );
      },
    },
    {
      accessorKey: 'studentName',
      header: 'Student Name',
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: 'invoices',
      header: 'Program',
      cell: (props) => {
        const programs = props.getValue();
        return (
          <div>
            {programs.map((program, index) => (
              <p className={styles.pTitles} key={index}>{program.programTitle}</p>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: 'invoiceId',
      header: 'Print',
      cell: (props) => (
          <FaPrint className={styles.print} size={30}  onClick={() => handleGenerateReport(props.row.original.invoiceId)} />
      ),
    },
  ];

  const table = useReactTable({
    columns,
    data: invoices,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search for invoice.." />
          <div></div>
        </div>
        <div style={{overflowX: 'auto'}}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className={styles.header} key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <td key={header.id}>{header.column.columnDef.header}</td>
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
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      <span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
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
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className={styles.paginationBtns}>
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              {"<"}
            </button>
            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInvoicesTable;
