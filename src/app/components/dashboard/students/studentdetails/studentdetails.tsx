import React, { useState, useEffect } from 'react';
import style from './studentdetails.module.css';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RealtimeLoader from '@/app/components/loader/loader';
import UpdateStudentModal from '../modal/updatemodal/updatemodal';
import { storeBill } from '@/app/utils/studentData';
import { sendPaymentData } from '@/app/utils/paymentData';
import StudentInvoice from '../invoice/studentinvoice';
import { generateStudentInvoice } from '@/app/utils/studentData';
// import { generateStudentReport } from '@/app/lib/studentJsReport'
import {
  FaRegEnvelope,
  FaPhoneAlt,
  FaUserGraduate,
  FaCertificate,
} from "react-icons/fa";

interface Program {
  programId: number;
  title: string;
  price: number;
}

function StudentDetails({ student }: any) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isInvoiceOpen, setInvoiceOpen] = useState(false);
  const [openPayment, setOpenPayment] = useState(false)
  const [loading, setLoading] = useState(false);
  const [iLoading, setILoading] = useState(false);
  const router = useRouter();
  const [invoiceData, setInvoiceData] = useState({});
  const [isEnrollmentOpen, setEnrollmentOpen] = useState(false);
  const [isBillOpen, setBillOpen] = useState(false);
    
  const allAvailableCourses = [
    { "programId": 1, "title": "Backend Web Development" },
    { "programId": 2, "title": "Fullstack Development" },
    { "programId": 3, "title": "Graphics & Product Design" },
    { "programId": 4, "title": "Frontend Web Development" },
    { "programId": 5, "title": "Python Development" },
    { "programId": 6, "title": "Data Science" },
    { "programId": 7, "title": "Mobile App Development" }
  ];
  const unenrolledCourses = allAvailableCourses.filter(course => !student.programs.find((ec:any) => ec.programId === course.programId));


  const handleBill = async (event:any) => {
    event.preventDefault();

    // Extracting selected program IDs
    const selectedIds:any = [];
    const checkboxes = event.target.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach((checkbox:any) => {
      selectedIds.push(parseInt(checkbox.value));
    });

    // Check if any checkboxes are checked
    if (selectedIds.length === 0) {
      // Display an error message
      alert("Please select at least one program.");
      return; // Prevent form submission
    }

    // Creating the JSON object
    const billData:any = {
      studentId: student.studentId,
      programIds: selectedIds
    };

    try {
      await storeBill(billData); 
      toast.success("Student bill added successfully");
      // Additional actions after successful submission


        router.refresh(); // Assuming you have access to router object for refreshing

    } catch (error) {
      console.error('Error updating Student:', error);
      
      toast.error("Error adding student bill. Please try again.");
    } 
    console.log(billData);
  };

  
  const openModal = () => {
    setModalOpen(true);
    setBillOpen(false)
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
  const showPayment = ()=>{
    setOpenPayment(!openPayment)
  }
  const generateInvoice = async () => {
    try {
      setILoading(true);

      const selectedBills = student.bills.filter((bill: any) => {
        const checkbox = document.getElementById(`bill-${bill.billId}`) as HTMLInputElement;
        return checkbox.checked;
      });

      const totalAmount = selectedBills.reduce((sum: number, bill: any) => sum + bill.amount, 0);
      const formattedTotalAmount = totalAmount.toLocaleString();

      const invoiceData = {
        totalbills: [{ amount: formattedTotalAmount }],
        courses: selectedBills.flatMap((bill: any) => {
          const correspondingPrograms = student.programs.filter((program: any) => program.billId === bill.billId);
          return correspondingPrograms.map((program: any) => ({
            programId: program.programId,
            title: program.title,
            price: program.price.toLocaleString()
          }));
        }),
        studentName: student.firstname + " " + student.lastname,
        studentEmail: student.email,
        studentPhone: student.phone,
        invoiceNumber: ""
      };

      const pdfBlob = await generateStudentInvoice(invoiceData);
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);

      setILoading(false);
    } catch (error) {
      console.error("An error occurred while generating the invoice:", error);
      setILoading(false); 
    }
  };






  useEffect(() => {

  }, [invoiceData]); 

  const getStatusLabel = (status: number) => {
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
          <div className={style.cont}>
            <div>
              <div className={style.title}>
                <div>
                  <h2>{student.lastname + ' ' + student.firstname}</h2>
                  {student.programs.map((program: any, index: any) => (
                    <p key={program.index} className={style.programT}>{program.title}</p>
                  ))}
                  <h4></h4>
                </div>
              </div>
              <div className={style.info}>
                <FaRegEnvelope />
                <p>{student.email}</p>
              </div>
              <div className={style.info}>
                <FaPhoneAlt />
                <p>{student.phone}</p>
              </div>
              <div className={style.info}>
                <FaUserGraduate />
                <p>{getStatusLabel(student.studentStatus)}</p>
              </div>
              <div className={style.info}>
                <FaCertificate />
                <p>{student.location}</p>
              </div>
              <div className={style.info}>
                <FaCertificate />
                <p>{student.deliveryType}</p>
              </div>
              <div className={style.info}>
                <FaCertificate />
                <p>{student.cohort}</p>
              </div>
              <UpdateStudentModal student={student} isOpen={isModalOpen} closeModal={closeModal} onClose={closeModal} />
              <div className={style.action_btns}>
            <button onClick={openModal} className={style.warning}>Update</button>
            
            <button onClick={()=> setBillOpen(!isBillOpen)} className={style.success}>View Bills</button>

              {/* <button className={style.success}>Pay</button> */}
              </div>
              {isBillOpen?(
                    <div className={style.billCont}>
                    <h5>Select Bill</h5>
                   {student.bills.map((bill: any) => (
            <div key={bill.billId}>
                <input type="checkbox" id={`bill-${bill.billId}`} value={bill.billId} />
                <label htmlFor={`bill-${bill.billId}`}> - {bill.description} - {bill.amount}</label>
            </div>
        ))}
                      <button onClick={generateInvoice} className={style.success}>
                          {iLoading ? "Generating Invoice..." : "Generate Invoice"}
                        </button>
                   </div>
              ):('')}
       


            </div>
    
            {isEnrollmentOpen? (
              <>
              <div> 
                  <h5>Enroll more courses</h5 >
                  <div>
                  <form onSubmit={handleBill}>
      {unenrolledCourses.map(course => (
        <div key={course.programId}>
          <input type="checkbox" value={course.programId} id={course.title} name={course.title} />
          <label htmlFor={course.title}>{course.title}</label>
        </div>
      ))}
      
      <button className={style.success} type="submit">Submit</button>
    </form>
            
           </div>
                  </div>
              </>
            ): ('')

            }
            <div>

            <button onClick={()=> setEnrollmentOpen(!isEnrollmentOpen)} className={style.success}>Enroll</button>
          
            </div>
           

        
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDetails;
