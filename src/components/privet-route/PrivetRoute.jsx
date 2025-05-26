"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetMe } from "@/hooks/useGetMe";
import Loading from "../loading/Loading";

export default function PrivateRoute({ children }) {
  const router = useRouter();
  const { data: user, isLoading, isError } = useGetMe();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user || isError) {
        router.replace("/auth/login");
      } else {
        setChecked(true); // render only after all checks pass
      }
    }
  }, [user, isLoading, isError, router]);

  if (isLoading || !checked) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  return children;
}
