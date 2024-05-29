// Your main page component (e.g., `page.tsx`)
"use client"
import React, { useState, useEffect } from 'react';
// import supabase from '@/app/lib/supabase';
import RealtimeLoader from '@/app/components/loader/loader';
import Studentdetails from '@/app/components/dashboard/students/studentdetails/studentdetails';
import { fetchStudentById } from '@/app/utils/studentData';
import ProspectDetails from '@/app/components/dashboard/students/prospectdetails/studentdetails';
function Page({ params }: { params: { slug: string } }) {
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        var id = params.slug
        const fetchedData = await fetchStudentById(id);
        console.log(fetchedData)
        setStudent(fetchedData);
      } catch (error) {
        // Handle error
      }
      finally {
        setLoading(false);
      }
    };

    getData();
  },  [params.slug]);

  return (
    <div>
      {loading ? (
        <RealtimeLoader />
      ) : (
        <ProspectDetails student={student} />
      )}
    </div>
  );
}

export default Page;
