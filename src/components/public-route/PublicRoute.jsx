"use client"; 

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetMe } from "@/hooks/useGetMe";
import Loading from "../loading/Loading";

const PublicRoute = ({ children }) => {
  const router = useRouter();
  const { data: user, isLoading, isError } = useGetMe();
  const [hasMounted, setHasMounted] = useState(false); 

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && !isLoading) {
      if (user && !isError) {
        router.replace("/");
      }
    }
  }, [user, isLoading, isError, router, hasMounted]);
  if (!hasMounted || isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#E6F8F7]">
        <Loading />
      </div>
    );
  }
  return <>{children}</>;
};

export default PublicRoute;