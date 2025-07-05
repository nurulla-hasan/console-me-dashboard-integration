"use client";
import { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi";
import { ImUserTie } from "react-icons/im";
import { MdPayment } from "react-icons/md";
import Topbar from '@/components/layout/Topbar';
import Sidebar from '@/components/layout/Sidebar';
import PrivateRoute from '@/components/private-route/PrivateRoute';
import { usePathname } from "next/navigation";

const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <LuLayoutDashboard size={20} /> },
    { label: "User Management", href: "/dashboard/users", icon: <HiOutlineUserCircle size={20} /> },
    { label: "Consult Management", href: "/dashboard/consults", icon: <ImUserTie size={20} /> },
    { label: "Payment", href: "/dashboard/payments", icon: <MdPayment size={20} /> },
    { label: "Category Management", href: "/dashboard/categories", icon: <LuLayoutDashboard size={20} /> },
    { label: "Notification", href: "/dashboard/notification", icon: <LuLayoutDashboard size={20} /> },
];
const settingMenu = [
    { label: "Profile", href: "/dashboard/settings/profile" },
    { label: "Terms & Condition", href: "/dashboard/settings/terms" },
    { label: "About Us", href: "/dashboard/settings/about" },
];

export default function DashboardLayout({ children }) {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const pathname = usePathname();
    return (
        <div className="min-h-screen flex container mx-auto max-w-full bg-[#dbf8f8]">
            {/* Sidebar */}
            <Sidebar {...{ menuItems, setSettingsOpen, settingsOpen, settingMenu, pathname }} />

            {/* Main content */}
            <main className="flex-1 overflow-auto scrl-hide bg-[#dbf8f8]">
                {/* Top bar */}
                <Topbar />
                <div className='font-poppins min-h-[calc(100vh-96px)] overflow-y-auto rounded-t-lg bg-[#f8f8f8]'>
                    <PrivateRoute>
                        {children}
                    </PrivateRoute>
                </div>
            </main>
        </div>
    );
}