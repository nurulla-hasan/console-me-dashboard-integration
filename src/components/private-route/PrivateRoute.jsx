"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useGetMe } from "@/hooks/useGetMe";
import Loading from "../loading/Loading";
import { useQueryClient } from "@tanstack/react-query";

const PrivateRoute = ({ children }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: user, isLoading, isError } = useGetMe(); 

  useEffect(() => {
    if (!isLoading && (!user || isError)) {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.replace("/auth/login");
    }
  }, [user, isLoading, isError, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#E6F8F7]">
        <Loading />
      </div>
    );
  }

  if (user) {
    return <>{children}</>;
  }
  return null;
};

export default PrivateRoute;