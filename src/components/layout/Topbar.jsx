import Image from 'next/image';
import Link from 'next/link';
import React, { use } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useSelector } from 'react-redux';

const Topbar = ({ isHideLayout }) => {

    const user = useSelector(state => state.auth.user)

    return (
        <>
            <div className={`${isHideLayout ? "hidden" : ""} bg-[#dbf8f8] backdrop-blur-2xl z-10 sticky top-0 flex justify-end items-center gap-4 h-24 pr-12`}>
                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center cursor-pointer">
                    <Link href="/notification">
                        <IoMdNotificationsOutline color='#00A89D' size={20} />
                    </Link>
                </button>
                <Image
                    src="/images/avatar.png"
                    width={40}
                    height={40}
                    alt="User"
                    className="rounded-full cursor-pointer"
                />
                <span className="text-md font-medium text-gray-700">{user?.name || "Golap Hasan"}</span>
            </div>
        </>
    );
};

export default Topbar;