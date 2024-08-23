import React, { useEffect, useState } from "react";
import { IoIosPeople } from "react-icons/io";
import { FaLaptopFile } from "react-icons/fa6";
import { TbDeviceLaptopOff } from "react-icons/tb";
import Styles from "./cards.module.css";
import { getAllProspects, getAllStudents } from "@/app/utils/studentData";
import { getAllLaptops, soldLaptopsCount } from "@/app/utils/laptopData";
import { getDashboardData } from "@/app/utils/studentData";

interface DashboardItem {
  smtd: number;
  sytd: number;
  pytd: number;
  pmtd: number;
}
function Cards() {
  const [laptopsCount, setLaptopsCount] = useState([]);
  const [soldLaptopsCounts, setSoldLaptopsCounts] = useState([]);
  const [dashboardData, setDashboardData] = useState<DashboardItem | null>(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const { laptopCounts }: any = await getAllLaptops();
        const soldLaptopsCounts = await soldLaptopsCount();
        const dashboardData: any = await getDashboardData();
        setDashboardData(dashboardData);
        setLaptopsCount(laptopCounts);
        setSoldLaptopsCounts(soldLaptopsCounts);
      } catch (error) {
      
      } finally {
      }
    };

    getData();
  }, []);

  return (
    <div className={Styles.cont}>
      <div className={Styles.card}>
        <IoIosPeople size={50} />
        <div className={Styles.dtl}>
          <span>Total Students</span>
          <div style={{ display: "flex",  justifyContent: "space-between", alignItems: 'center'}}>
            <div className={Styles.count}>
              <h1>{dashboardData?.sytd}</h1>
              <span>YTD</span>
            </div>
            <div className={Styles.seprator}></div>
            <div className={Styles.count}>
              <h1>{dashboardData?.smtd}</h1>
              <span>MTD</span>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.card}>
        <IoIosPeople size={50} />
        <div className={Styles.dtl}>
          <span>Total Prospects</span>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
            <div className={Styles.count}>
              <h1>{dashboardData?.pytd}</h1>
              <span>YTD</span>
            </div>
            <div className={Styles.seprator}></div>
            <div className={Styles.count}>
              <h1>{dashboardData?.pmtd}</h1>
              <span>MTD</span>
            </div>
          </div>
        </div>
      </div>

      <div className={Styles.card}>
        <FaLaptopFile size={50} />
        <div className={Styles.dtl}>
          <span>Available Laptops</span>
          <h1>{laptopsCount}</h1>
        </div>
      </div>
      {/* <div className={Styles.card}>
        <TbDeviceLaptopOff size={50} />
        <div className={Styles.dtl}>
          <span>Sold Laptops</span>
          <h1>{soldLaptopsCounts}</h1>
        </div>
      </div> */}
    </div>
  );
}

export default Cards;
