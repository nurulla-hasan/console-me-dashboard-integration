'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import ConsultGrowthChart from "@/components/dashboard/ConsultGrowthChart";
import UserGrowthChart from "@/components/dashboard/UserGrowthChart";
import EarningGrowthChart from "@/components/dashboard/EarningGrowthChart";
import PageContainer from "@/components/container/PageContainer";

export default function Home() {
  return (
    <PageContainer>
      {/* Top Info */}
      <div className="flex flex-col gap-4">
        <div className="text-black">
          <div className="flex justify-evenly gap-5">

            {/** Card Data */}
            {[
              { title: "Total Users", value: "852,650", img: "/images/total-user.png" },
              { title: "Total Consultants", value: "2,650", img: "/images/total-user.png" },
              { title: "Total Earnings", value: "$5,650", img: "/images/total-user.png" },
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
                  <p className="text-lg font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}

          </div>
        </div>

        {/* Middle Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex gap-5"
        >
          <div className="flex-1/2">
            <UserGrowthChart />
          </div>
          <div className="flex-1/2">
            <ConsultGrowthChart />
          </div>
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <EarningGrowthChart />
        </motion.div>
      </div>
    </PageContainer>
  );
}
