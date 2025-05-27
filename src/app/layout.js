"use client";
import './globals.css';
import { useState } from "react";
import { usePathname } from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiOutlineUserCircle } from "react-icons/hi";
import { ImUserTie } from "react-icons/im";
import { MdPayment } from "react-icons/md";
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Topbar from '@/components/layout/Topbar';
import PrivateRoute from '@/components/private-route/PrivateRoute';
import Sidebar from '@/components/layout/Sidebar';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const menuItems = [
  { label: "Dashboard", href: "/", icon: <LuLayoutDashboard size={20} /> },
  { label: "User Management", href: "/users", icon: <HiOutlineUserCircle size={20} /> },
  { label: "Consult Management", href: "/consults", icon: <ImUserTie size={20} /> },
  { label: "Payment", href: "/payments", icon: <MdPayment size={20} /> },
  { label: "Category Management", href: "/categories", icon: <LuLayoutDashboard size={20} /> },
];
const settingMenu = [
  { label: "Profile", href: "/profile" },
  { label: "Terms & Condition", href: "/terms" },
  { label: "About Us", href: "/about" },
];

export default function RootLayout({ children }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const pathname = usePathname();
  const publicRoutes = ["/auth/login", "/auth/forgot-password", "/auth/verify-email", "/auth/reset-password"];
  const isPublicRoute = publicRoutes.includes(pathname);

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
            {isPublicRoute ? (
              <div className="font-poppins overflow-y-auto min-h-screen bg-[#f8f8f8]">
                {children}
              </div>
            ) : (
              <PrivateRoute>
              <div className="min-h-screen flex container mx-auto max-w-full bg-[#dbf8f8]">
                {/* Sidebar */}
                <Sidebar {...{ menuItems, setSettingsOpen, settingsOpen, settingMenu, pathname }} />

                {/* Main content */}
                <main className="flex-1 overflow-auto scrl-hide bg-[#dbf8f8]">
                  {/* Top bar */}
                  <Topbar />

                  <div className='font-poppins min-h-[calc(100vh-96px)] overflow-y-auto rounded-t-lg bg-[#f8f8f8]'>
                    
                        {children}
                    
                  </div>
                </main>
              </div>
              </PrivateRoute>
            )}
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  );
}