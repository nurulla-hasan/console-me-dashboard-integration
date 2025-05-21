"use client"
import { Toaster } from "react-hot-toast";
export default function RootLayout({ children }) {
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="bg-[#E6F8F7]">
                {children}
            </div>
        </>
    );
}