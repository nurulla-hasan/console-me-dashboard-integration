"use client";
import Link from 'next/link';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useGetMe } from '@/hooks/useGetMe';

const Topbar = ({ isHideLayout }) => {

    const { data: user, isLoading, isError } = useGetMe();
    return (
        <div className={`${isHideLayout ? "hidden" : ""} bg-[#dbf8f8] backdrop-blur-2xl z-10 sticky top-0 flex justify-end items-center gap-4 h-24 pr-12`}>
            <div className='flex items-center gap-4'>
                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer">
                    <Link href="/notification">
                        <IoMdNotificationsOutline color='#00A89D' size={20} />
                    </Link>
                </button>
                <Link href={"/profile"}>
                    <img
                        src={user?.photo_url || "/images/avatar.png"}
                        alt="User"
                        className="rounded-full cursor-pointer w-10 h-10 object-cover"
                    />
                </Link>
                <span className="text-md font-medium text-gray-700">{user?.name || "Unknown User"}</span>
            </div>
        </div>
    );
};

export default Topbar;
