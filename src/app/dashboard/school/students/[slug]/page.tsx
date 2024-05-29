
"use client"
import React, { useState, useEffect } from 'react';
// import supabase from '@/app/lib/supabase';
import RealtimeLoader from '@/app/components/loader/loader';
import Studentdetails from '@/app/components/dashboard/students/studentdetails/studentdetails';
import { fetchStudentById } from '@/app/utils/studentData';
import {useRouter} from 'next/navigation';
function Page({ params }: { params: { slug: string } }) {
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      try {
        var id = params.slug
        if(id){
          const fetchedData = await fetchStudentById(id);
          console.log(fetchedData)
          if(fetchedData){

            setStudent(fetchedData);
          }else {
            throw new Error("Student not found");
          }
        }
       
       
      } catch (error) {
        console.error(error);
        // Redirect to a 404 page or handle error accordingly
        router.push('/404');
      }
      finally {
        setLoading(false);
      }
    };

    getData();
  },  [params.slug, router]);

  return (
    <div>
      {loading ? (
        <RealtimeLoader />
      ) : (
        <Studentdetails student={student} />
      )}
    </div>
  );
}

export default Page;
