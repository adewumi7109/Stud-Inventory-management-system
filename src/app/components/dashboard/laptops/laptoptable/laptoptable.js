import React, { useState } from "react";
import styles from "@/app/components/dashboard/laptops/laptops.module.css";
import RealtimeLoader from "@/app/components/loader/loader";
import Link from "next/link";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Modal from "@/app/components/dashboard/laptops/modal/modal";
import Search from "@/app/components/dashboard/laptops/search/search";

function Laptoptable({
  searchQuery,
  laptops,
  loading,
  closeModal,
  isModalOpen,
  openModal,
  pageNumber,
  totalPages,
  handleNextPage,
  handlePreviousPage,
}) {
  // State to track loading for each action button
  const [loadingStates, setLoadingStates] = useState(
    Array(laptops.length).fill(false)
  );

  const handleViewClick = async (rowIndex) => {
    const updatedLoadingStates = [...loadingStates];
    updatedLoadingStates[rowIndex] = true;
    setLoadingStates(updatedLoadingStates);

    try {
      // Simulate an async operation (like API call)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Perform the actual navigation or logic here
      console.log(`Viewing laptop with ID: ${laptops[rowIndex].id}`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      updatedLoadingStates[rowIndex] = false;
      setLoadingStates(updatedLoadingStates);
    }
  };

  const columns = [
    {
      accessorKey: "serialNumber",
      header: "Serial Number",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: (props) => (
        <p>
          {new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(props.getValue())}
        </p>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: (props) => {
        const rowIndex = props.row.index;
        return (
          <button
            className={styles.viewBtn}
            onClick={() => handleViewClick(rowIndex)}
            disabled={loadingStates[rowIndex]} // Disable button when loading
          >
            {loadingStates[rowIndex] ? "Loading..." : "View"}
          </button>
        );
      },
    },
  ];

  const table = useReactTable({
    columns,
    data: laptops,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.top}>
          <Search
            searchQuery={searchQuery}
            placeholder="Search for laptop..."
          />
          <div>
            <button className={styles.addButton} onClick={openModal}>
              Add new laptop
            </button>
            <Modal
              isOpen={isModalOpen}
              closeModal={closeModal}
              onClose={closeModal}
            />
          </div>
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
                      <Link
                        href={`/dashboard/inventory/laptops/${row.original.id}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
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
            <button onClick={handlePreviousPage} disabled={pageNumber <= 1}>
              {"<"}
            </button>
            <button
              onClick={handleNextPage}
              disabled={pageNumber >= totalPages}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Laptoptable;
