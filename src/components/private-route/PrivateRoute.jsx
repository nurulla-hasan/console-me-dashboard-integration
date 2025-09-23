// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useGetMe } from "@/hooks/useGetMe";
// import Loading from "../loading/Loading";
// import { useQueryClient } from "@tanstack/react-query";

// const PrivateRoute = ({ children }) => {
//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const { data: user, isLoading, isError } = useGetMe();

//   const [hasMounted, setHasMounted] = useState(false); 

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   useEffect(() => {
//     if (hasMounted && !isLoading) {
//       if (isError || !user) {
//         // Only redirect if not already on the login page to prevent infinite loops
//         if (router.pathname !== "/auth/login") {
//           queryClient.invalidateQueries({ queryKey: ["me"] });
//           router.replace("/auth/login");
//         }
//       }
//     }
//   }, [user, isLoading, isError, router, queryClient, hasMounted]);

//   // Show loading state while data is being fetched or component hasn't mounted
//   if (!hasMounted || isLoading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <Loading />
//       </div>
//     );
//   }

//   // If user is authenticated, render children
//   if (user) {
//     return <>{children}</>;
//   }

//   return null;
// };

// export default PrivateRoute;



"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      router.replace("/auth/login");
    }
  }, [router]);

  if (!hasMounted) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default PrivateRoute;