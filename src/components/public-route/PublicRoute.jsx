// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useGetMe } from "@/hooks/useGetMe";
// import Loading from "../loading/Loading";

// const PublicRoute = ({ children }) => {
//   const router = useRouter();
//   const { data: user, isLoading, isError } = useGetMe();
//   const [hasMounted, setHasMounted] = useState(false); 

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   useEffect(() => {
//     if (hasMounted && !isLoading) {
//       if (user && !isError) { // User IS authenticated
//         // Only redirect if not already on the dashboard page to prevent infinite loops
//         if (router.pathname !== "/") {
//           router.replace("/");
//         }
//       }
//     }
//   }, [user, isLoading, isError, router, hasMounted]);

//   // Show loading state while data is being fetched or component hasn't mounted
//   if (!hasMounted || isLoading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <Loading />
//       </div>
//     );
//   }

//   // If user is authenticated, return null (will be redirected by useEffect)
//   if (user && !isError) {
//     return null;
//   }

//   // If not authenticated, render children
//   return <>{children}</>;
// };

// export default PublicRoute;



"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";

const PublicRoute = ({ children }) => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
      router.replace("/"); // Redirect authenticated user to dashboard
    }
  }, [router]);

  if (!hasMounted) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return !isAuthenticated ? <>{children}</> : null;
};

export default PublicRoute;