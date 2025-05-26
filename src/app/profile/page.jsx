"use client";
import PageContainer from '@/components/container/PageContainer';
import { FiCamera } from "react-icons/fi";
import Image from 'next/image';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import EditProfiletab from '@/components/profile/tabs/EditProfiletab';
import EditPassTab from '@/components/profile/tabs/EditPassTab';
import { motion, AnimatePresence } from "framer-motion";
import { useGetMe } from '@/hooks/useGetMe';
import Loading from '@/components/loading/Loading';
import { api } from '@/lib/api/axiosInstance';
import { ErrorToast, SuccessToast } from '@/utils/ValidationToast';

const Page = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const { register, handleSubmit } = useForm();
    const fileInputRef = useRef(null);

    // get profile data
    const { data: user, isLoading, isError } = useGetMe();

    // Edit Profile Data
    const onSubmitProfile = async (formData) => {
        const updateData = {
            name: formData.name,
            phone: formData.phone,
            city: formData.city
        }

        const res = await api.patch("/profile", updateData)
        console.log(res.data)
    };

    // Change Password
    const onSubmitPassword = async (fromData) => {
        try {
            const changePass = {
                old_password: fromData.currentPassword,
                new_password: fromData.newPassword
            }
            const res = await api.post("/profile/change-password", changePass)
            SuccessToast(res?.data?.message)
        } catch (error) {
            const message = error?.response?.data?.message
            if (message === "Invalid password") {
                ErrorToast("Invalid Current Password")
            }
            ErrorToast("Something Went Wrong")
        }

    };

    // Change Profile Image
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setPreviewImage(imageURL);
        }
    };

    return (
        <PageContainer>
            <motion.h1
                className='text-xl font-medium'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                Profile
            </motion.h1>

            <div className="flex flex-col items-center justify-start min-h-[80vh]">
                {/* Avatar Section */}
                <motion.div
                    className='flex flex-col justify-center items-center gap-3 mb-6'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className='relative'>
                        {
                            isLoading ? (
                                <div className='w-24 h-24'>
                                    <Loading />
                                </div>
                            ) : (
                                <div>
                                    <Image
                                        src={user?.photo_url || "https://avatar.iran.liara.run/public/boy"}
                                        width={100}
                                        height={100}
                                        alt="Profile Picture"
                                        className='rounded-full object-cover w-24 h-24'
                                    />
                                </div>
                            )
                        }

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className='absolute flex justify-center items-center p-1.5 w-8 h-8 border-2 border-white bg-teal-600 rounded-full top-16 -right-2 cursor-pointer'
                        >
                            <FiCamera size={22} color='#fff' />
                        </div>
                    </div>
                    <h1 className='text-2xl font-medium'>{user?.name}</h1>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-6 mb-6">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`pb-2 border-b-2 cursor-pointer ${activeTab === 'profile'
                            ? 'border-teal-500 text-teal-500 font-semibold'
                            : 'border-transparent text-gray-600'
                            }`}
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('password')}
                        className={`pb-2 border-b-2 cursor-pointer ${activeTab === 'password'
                            ? 'border-teal-500 text-teal-500 font-semibold'
                            : 'border-transparent text-gray-600'
                            }`}
                    >
                        Change Password
                    </button>
                </div>

                {/* Forms */}
                <div className="w-full max-w-md rounded-lg">
                    <AnimatePresence mode="wait">
                        {activeTab === 'profile' && (
                            <motion.div
                                key="profile-tab"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <EditProfiletab {...{ activeTab, handleSubmit, onSubmitProfile, register, user }} />
                            </motion.div>
                        )}

                        {activeTab === 'password' && (
                            <motion.div
                                key="password-tab"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <EditPassTab {...{ activeTab, handleSubmit, onSubmitPassword, register }} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div >
        </PageContainer >
    );
};

export default Page;
