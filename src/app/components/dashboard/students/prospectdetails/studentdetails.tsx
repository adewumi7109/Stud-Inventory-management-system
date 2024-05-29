import React, { useState } from 'react';
import style from './studentdetails.module.css';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RealtimeLoader from '@/app/components/loader/loader';
import UpdateStudentModal from '../modal/updatemodal/prospectupdatemodal';
import StudentInvoice from '../invoice/studentinvoice';
import { updateStudent } from '@/app/utils/studentData';
import { 
  FaRegEnvelope,
  FaPhoneAlt,
  FaUserGraduate,
  FaCertificate,
  
} from "react-icons/fa";

function StudentDetails({ student }: any) {
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
var status = student?.studentStatus
  const enrollStudent = async ()=>{
    try {
      await updateStudent(student.studentId, {

        studentStatus: 0,
        lastname: student?.lastname,
        firstname: student?.firstname,
        email: student?.email,
        phone: student?.phone,
        location: student?.location,
        cohort: student?.cohort,
        deliveryType: student?.deliveryType,
   
      })
      toast.success("Student enrolled successfully"); 
    } catch (error) {
      console.error('Error enrolling Student:', error);
      
      toast.error("Error enrolling Student. Please try again.");
    }
    
  }

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
        <div>
          <div className={style.title}>
            <div>
              <h2>{student.lastname + ' ' + student.firstname}</h2>
              {student.programs.map((program:any, index:any)=>(
                <p key={program.index} className={style.programT}>{program.title}</p>
            ))}
              <h4></h4>
            </div>
            {/* <button className={style.enrBtn}>Enroll</button> */}
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
          {/* <StudentInvoice student={student} isOpen={isInvoiceOpen} closeModal={closeInvoice} onClose={closeInvoice} /> */}
          <div className={style.action_btns}>
            <button onClick={openModal} className={style.warning}>Update</button>
            <button onClick={enrollStudent} className={style.success}>Enroll Student</button>
          </div>
        </div>
      )}
    </div>
    
  </div>
  );
}

export default StudentDetails;
