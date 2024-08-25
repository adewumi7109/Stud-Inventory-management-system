import React, { useState } from "react";
import styles from "@/app/components/dashboard/laptops/laptops.module.css";
import RealtimeLoader from "@/app/components/loader/loader";
import { FaPrint } from "react-icons/fa";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { generateReport } from "@/app/lib/jsreportservice";

const LaptopInvoicesTable = ({ invoices, loading }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingInvoiceId, setLoadingInvoiceId] = useState(null);

  const handleGenerateReport = async (invoiceId) => {
    setIsLoading(true);
    setLoadingInvoiceId(invoiceId);

    const invoice = invoices.find((invoice) => invoice.invoiceId === invoiceId);

    if (!invoice) {
      console.error("Invoice not found");
      setIsLoading(false);
      setLoadingInvoiceId(null);
      return;
    }

    const data = {
      Invoice: {
        Name: invoice.customerName,
        Address: invoice.address,
        Phone: invoice.phone,
        Email: invoice.email,
        InvoiceNumber: invoice.invoiceNumber,
        Date: invoice.createdAt.split(" ")[0],
        Price: new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(invoice.laptop.price),
        Laptop: {
          Brand: invoice.laptop.brand,
          Model: invoice.laptop.model,
          Processor: invoice.laptop.processor,
          Ram: invoice.laptop.ram,
          Storage: invoice.laptop.storageSize,
          StorageType: invoice.laptop.storageType,
          SerialNumber: invoice.laptop.serialNumber,
          Processor_speed: invoice.laptop.processorSpeed,
        },
      },
    };

    try {
      await generateReport(data);
    } catch (error) {
      console.error("An error occurred while generating the report:", error);
    } finally {
      setIsLoading(false);
      setLoadingInvoiceId(null);
    }
  };

  const columns = [
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: (props) => <p>{props.getValue().split(" ")[0]}</p>,
    },
    {
      accessorKey: "customerName",
      header: "Customer Name",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "laptop.serialNumber",
      header: "Serial Number",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "invoiceId",
      header: "Print",
      cell: (props) => (
        <div
          className={styles.printButton}
          onClick={() => handleGenerateReport(props.row.original.invoiceId)}
          disabled={isLoading && loadingInvoiceId === props.row.original.invoiceId}
        >
          {isLoading && loadingInvoiceId === props.row.original.invoiceId ? (
            <span>Printing...</span>
          ) : (
            <FaPrint size={30} />
          )}
        </div>
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
        <div className={styles.top}></div>
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
                      <span>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </span>
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
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className={styles.paginationBtns}>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopInvoicesTable;
