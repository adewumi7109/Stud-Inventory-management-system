
"use client"
import React, { useState, useEffect } from 'react';

import Laptopdetails from '@/app/components/dashboard/laptops/laptopdetails/laptopdetails';
import RealtimeLoader from '@/app/components/loader/loader';
import { fetchLaptopById } from '@/app/utils/laptopData';
function Page({ params }: { params: { slug: string } }) {
  const [loading, setLoading] = useState(true);
  const [laptop, setLaptop] = useState({});
  var id = params.slug
  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await fetchLaptopById(id);
        console.log(fetchedData)
        setLaptop(fetchedData);
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
        <Laptopdetails laptop={laptop} />
  
      )}
    </div>
  );
}

export default Page;
