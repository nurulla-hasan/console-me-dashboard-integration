"use client"
import PublicRoute from "@/components/public-route/PublicRoute";
import { Toaster } from "react-hot-toast";
export default function RootLayout({ children }) {
    return (
        <>
            <PublicRoute>
                <div className="bg-[#E6F8F7]">
                    {children}
                </div>
            </PublicRoute>
        </>
    );
}