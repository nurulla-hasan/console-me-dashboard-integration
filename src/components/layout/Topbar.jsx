"use client";
import Link from 'next/link';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useGetMe } from '@/hooks/useGetMe';
import { useQuery } from '@tanstack/react-query';
import { getNotificationsCount } from '@/lib/queries/getNotificationsCount';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Topbar = ({ isHideLayout }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

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
                        <div className='absolute flex justify-center items-center w-5 h-5 rounded-full bg-teal-500 top-0 right-0 text-[10px] '>
                            <span>{countResponse?.data}</span>
                        </div>
                    </Link>

                </button>
                <Link href={"/settings/profile"}>
                    <div className='relative w-10 h-10 rounded-full overflow-hidden'>
                        {!mounted || isLoading ? (
                            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
                        ) : (
                            <Image
                                src={user?.photo_url}
                                alt="User"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="rounded-full cursor-pointer object-cover"
                            />
                        )}
                    </div>
                </Link>
                <Link href={"/settings/profile"}>
                    {!mounted || isLoading ? (
                        <span className="w-24 h-5 bg-gray-300 animate-pulse rounded"></span>
                    ) : (
                        <span className="text-md font-medium text-gray-700">{user?.name}</span>
                    )}
                </Link>
            </div>
        </div>
    );
};

export default Topbar;