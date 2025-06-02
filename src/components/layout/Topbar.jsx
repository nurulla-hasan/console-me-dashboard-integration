"use client";
import Link from 'next/link';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useGetMe } from '@/hooks/useGetMe';
import { useQuery } from '@tanstack/react-query';
import { getNotificationsCount } from '@/lib/queries/getNotificationsCount';

const Topbar = ({ isHideLayout }) => {

    const { data: user, isLoading, isError } = useGetMe();

    const { data: countResponse, isLoading: countLoading, isError: countError } = useQuery({
        queryKey: ["notificationCount"],
        queryFn: getNotificationsCount
    })

    return (
        <div className={`${isHideLayout ? "hidden" : ""} bg-[#dbf8f8] backdrop-blur-2xl z-10 sticky top-0 flex justify-end items-center gap-4 h-24 pr-12`}>
            <div className='flex items-center gap-4'>
                <button className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer">
                    <Link href="/notification">
                        <IoMdNotificationsOutline color='#00A89D' size={30} />
                    </Link>

                    <div className='absolute flex justify-center items-center w-5 h-5 rounded-full bg-teal-500 top-0 right-0 text-[10px] '>
                        <span>{countResponse?.data}</span>
                    </div>
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
