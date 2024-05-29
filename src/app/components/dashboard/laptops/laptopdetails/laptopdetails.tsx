import React, { useState, useRef } from 'react';
import style from './laptopdetails.module.css';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import UpdateLaptopModal from '../modal/updatemodal/updatemodal';
import "react-toastify/dist/ReactToastify.css";
import RealtimeLoader from '@/app/components/loader/loader';
import Laptopinvoice from '../invoice/laptopinvoice';
import { deleteLaptop } from '@/app/utils/laptopData'; // Import your deleteLaptop function
import QRCode from "react-qr-code";
function Laptopdetails({ laptop }: any) {

  const divRef = useRef<HTMLDivElement>(null);

 const qrCode = (
  <QRCode 
  size={256}
  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
  value={
    `
    Serial number: ${laptop.serialNumber} 
    Model: ${laptop.model} 
    storage size: ${laptop.storageSize}
    storage type: ${laptop.storageType}
    Ram: ${laptop.ram}
    Price: ${laptop.price}
    `
  }
  viewBox={`0 0 256 256`}
  />
 )
 const downloadQr = () => {
  // Check if divRef.current is null
  if (!divRef.current) {
    console.error("divRef is null");
    return;
  }

  let svg = divRef.current.querySelector("svg")?.outerHTML;

  if (!svg) {
    console.error("SVG not found");
    return;
  }

  let blob = new Blob([svg], { type: 'image/svg+xml' });

  let svgUrl = URL.createObjectURL(blob);

  let img = new Image();

  img.onload = function() {
    // Create a canvas element
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    let ctx = canvas.getContext('2d');

    if (!ctx) {
      console.error("Canvas context is null");
      return;
    }

    ctx.drawImage(img, 0, 0);

    let pngUrl = canvas.toDataURL('image/png');

    let anchor = document.createElement("a");
    anchor.href = pngUrl;
    anchor.download = "qr-demo.png";

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);

    URL.revokeObjectURL(svgUrl);
  };

  img.src = svgUrl;
};




  const [isModalOpen, setModalOpen] = useState(false);
  const [isInvoiceOpen, setInvoiceOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openInvoice = () => {
    setInvoiceOpen(true);
  };

  const closeInvoice = () => {
    setInvoiceOpen(false);
  };

  const handleDelete = async (id: string) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this laptop?");
    if (!shouldDelete) {
      return;
    }

    try {
      setLoading(true);
      await deleteLaptop(id); // Call the deleteLaptop function to delete the laptop
      toast.error("Laptop deleted successfully");
      setTimeout(() => {
        router.push("/dashboard/inventory/laptops");
      }, 5000);
    } catch (error) {
      console.error('Error deleting laptop:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
      />
      <div className={style.header}></div>
      <div className={style.container}>
        {loading ? (
          <RealtimeLoader />
        ) : (
        <div className={style.wrapper}>
          <div>
            <h2 className={style.name}>{laptop.brand + ' ' + laptop.model}</h2>
            <div className={style.info}>
              <p>Serial No: {laptop.serialNumber}</p>
            </div>
            <div className={style.info}>
              <p>Model: {laptop.model}</p>
            </div>
            <div className={style.info}>
              <p>Processor: {laptop.processor}</p>
            </div>
            <div className={style.info}>
              <p>Processor Speed: {laptop.processorSpeed}</p>
            </div>
            <div className={style.info}>
              <p>Storage Size: {laptop.storageSize}</p>
            </div>
            <div className={style.info}>
              <p>Storage Type: {laptop.storageType}</p>
            </div>
            <div className={style.info}>
              <p>Ram: {laptop.ram} </p>
            </div>
            <div className={style.info}>
              <p>Gpu Size: {laptop.gpuSize}</p>
            </div>
            <div className={style.info}>
              <p>Price: {laptop.price}</p>
            </div>
            
            <div className={style.action_btns}>
              <button onClick={openInvoice} className={style.success}>Generate Invoice</button>
              <button onClick={openModal} className={style.warning}>Update</button>
              <button className={style.danger} onClick={() => handleDelete(laptop.id)}>Delete</button>
            </div>
            <div>
            <div>
            <div>
 
    </div>
    </div>
    </div>
            <UpdateLaptopModal laptop={laptop} isOpen={isModalOpen} closeModal={closeModal} onClose={closeModal} />
            <Laptopinvoice isOpen={isInvoiceOpen} onClose={closeInvoice} closeModal={closeInvoice} laptop={laptop}/>
          </div>
                     {/* <div className={style.qr} ref={divRef} style={{ height: "250px",   width: "250px" }}>

                     {qrCode}
                     <button onClick={downloadQr}>Download</button>
                     </div> */}
        </div>
        )}
      </div>
    </div>
  );
}

export default Laptopdetails;
