// Home.jsx
'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react'; // useEffect ইম্পোর্ট করুন

// সঠিক ইম্পোর্ট নিশ্চিত করুন
import UserGrowthChart from "@/components/dashboard/UserGrowthChart";
import ConsultGrowthChart from "@/components/dashboard/ConsultGrowthChart";
import EarningGrowthChart from "@/components/dashboard/EarningGrowthChart";

import PageContainer from "@/components/container/PageContainer";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/lib/queries/getDeshboardData";

import Loading from "@/components/loading/Loading";
import Error from "@/components/error/Error";


export const Home = () => {
  // প্রতিটি চার্টের জন্য আলাদা বছর স্টেট, প্রাথমিক মান null/undeined
  const [userYear, setUserYear] = useState(null);
  const [consultYear, setConsultYear] = useState(null);
  const [earningYear, setEarningYear] = useState(null);

  // API কল করার জন্য useQuery
  const { data: dashboardApiResponse, isLoading, isError } = useQuery({
    queryKey: ["dashBoarddata", userYear, consultYear, earningYear],
    queryFn: () => getDashboardData(userYear, consultYear, earningYear), // এখানে year প্যারামিটার optional বা default সেট করতে পারেন API-এ
    keepPreviousData: true,
  });

  // ডেটা destructuring
  const {
    total_users,
    total_consultants,
    total_earnings,
    user_growth,
    consultant_growth,
    earning_growth,
  } = dashboardApiResponse?.data || {};

  // যখন API ডেটা লোড হয়, তখন প্রাথমিক বছর সেট করুন
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
    // প্রাথমিক লোডিং অবস্থায় Loading কম্পোনেন্ট দেখান
    return <PageContainer><Loading /></PageContainer>;
  }

  if (isError) {
    return <PageContainer><Error itemName="dashboard data" /></PageContainer>;
  }

  // API থেকে পাওয়া সকল বছরের তালিকা তৈরি করুন (যদি আপনার API এমন ডেটা না দেয়, তাহলে ম্যানুয়ালি যোগ করতে পারেন)
  // এই ফাংশনটি একটি সরল অনুমান, আপনার API যদি বছরের তালিকা দিত তাহলে আরও ভালো হতো।
  // যেহেতু আপনার JSON এ শুধু 2025 আছে, আমি 2023, 2024, 2025 কে ডিফল্ট অপশন হিসেবে ধরে নিলাম।
  // যদি আপনার API বিভিন্ন বছরের ডেটা দিতে পারে, তাহলে getDashboardData ফাংশনটি বছরের তালিকাও রেসপন্স করবে আশা করা যায়।
  // আপাতত একটি স্ট্যাটিক অ্যারে ব্যবহার করা হচ্ছে যা আপনি প্রয়োজন অনুযায়ী পরিবর্তন করতে পারেন।
  const availableYears = [2023, 2024, 2025]; // আপনার API এর ডেটা অনুযায়ী এই বছরগুলো পরিবর্তন করুন

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
                availableYears={availableYears} // সকল বছর পাস করা হয়েছে
              />
            </div>
          )}
          {consultant_growth && consultant_growth.chart && consultYear !== null && (
            <div className="w-full lg:w-1/2">
              <ConsultGrowthChart
                chartData={consultant_growth.chart}
                currentYear={consultYear}
                onYearChange={setConsultYear}
                availableYears={availableYears} // সকল বছর পাস করা হয়েছে
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
              availableYears={availableYears} // সকল বছর পাস করা হয়েছে
            />
          )}
        </motion.div>
      </div>
    </PageContainer>
  );
}

export default Home;