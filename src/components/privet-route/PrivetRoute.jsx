"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  const router  = useRouter();

  // redirect when not authenticated
  // useEffect(() => {
  //   if (!user) {
  //     router.replace(`/auth/login`);
  //   }
  // }, [ user, router]);

  return children;
}
