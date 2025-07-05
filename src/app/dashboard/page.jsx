
'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';

import UserGrowthChart from "@/components/dashboard/UserGrowthChart";
import ConsultGrowthChart from "@/components/dashboard/ConsultGrowthChart";
import EarningGrowthChart from "@/components/dashboard/EarningGrowthChart";

import PageContainer from "@/components/container/PageContainer";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/lib/queries/getDeshboardData";

import Loading from "@/components/loading/Loading";
import Error from "@/components/error/Error";


export const Home = () => {
  const [userYear, setUserYear] = useState(null);
  const [consultYear, setConsultYear] = useState(null);
  const [earningYear, setEarningYear] = useState(null);

  const { data: dashboardApiResponse, isLoading, isError } = useQuery({
    queryKey: ["dashBoarddata", userYear, consultYear, earningYear],
    queryFn: () => getDashboardData(userYear, consultYear, earningYear), 
    keepPreviousData: true,
  });

  const {
    total_users,
    total_consultants,
    total_earnings,
    user_growth,
    consultant_growth,
    earning_growth,
  } = dashboardApiResponse?.data || {};

  useEffect(() => {
    if (dashboardApiResponse?.data) {
      if (user_growth && userYear === null) {
        setUserYear(user_growth.year);
      }
      if (consultant_growth && consultYear === null) {
        setConsultYear(consultant_growth.year);
      }
      if (earning_growth && earningYear === null) {
        setEarningYear(earning_growth.year);
      }
    }
  }, [dashboardApiResponse, user_growth, consultant_growth, earning_growth, userYear, consultYear, earningYear]);


  if (isLoading || userYear === null || consultYear === null || earningYear === null) {
    return <PageContainer><Loading /></PageContainer>;
  }

  if (isError) {
    return <PageContainer><Error itemName="dashboard data" /></PageContainer>;
  }

  const availableYears = [2023, 2024, 2025];

  return (
    <PageContainer>
      {/* Top Info */}
      <div className="flex flex-col gap-4">
        <div className="text-black">
          <div className="flex justify-evenly gap-5">

            {/** Card Data */}
            {[
              { title: "Total Users", value: total_users, img: "/images/total-user.png" },
              { title: "Total Consultants", value: total_consultants, img: "/images/total-user.png" },
              { title: "Total Earnings", value: `$${total_earnings || 0}`, img: "/images/total-user.png" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col justify-center items-center bg-[#0bc8bb13] rounded-lg py-4 w-full shadow-[0px_4px_4px_0px_#00000040]"
              >
                <div className="flex flex-col gap-5 items-center justify-center">
                  <h3 className="text-xl font-medium">{item.title}</h3>
                  <Image src={item.img} width={70} height={70} alt="/" />
                  <p className="text-lg font-medium">{item.value !== undefined ? item.value : 'N/A'}</p>
                </div>
              </motion.div>
            ))}

          </div>
        </div>

        {/* Middle Info - User Growth & Consultant Growth */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap lg:flex-nowrap gap-5"
        >
          {user_growth && user_growth.chart && userYear !== null && (
            <div className="w-full lg:w-1/2">
              <UserGrowthChart
                chartData={user_growth.chart}
                currentYear={userYear}
                onYearChange={setUserYear}
                availableYears={availableYears}
              />
            </div>
          )}
          {consultant_growth && consultant_growth.chart && consultYear !== null && (
            <div className="w-full lg:w-1/2">
              <ConsultGrowthChart
                chartData={consultant_growth.chart}
                currentYear={consultYear}
                onYearChange={setConsultYear}
                availableYears={availableYears}
              />
            </div>
          )}
        </motion.div>

        {/* Bottom Info - Earning Growth */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full"
        >
          {earning_growth && earning_growth.chart && earningYear !== null && (
            <EarningGrowthChart
              chartData={earning_growth.chart}
              currentYear={earningYear}
              onYearChange={setEarningYear}
              availableYears={availableYears} 
            />
          )}
        </motion.div>
      </div>
    </PageContainer>
  );
}

export default Home;