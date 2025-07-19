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
import { useQueryClient } from '@tanstack/react-query';

const Page = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const { register, handleSubmit } = useForm();
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null); 
    const [loading, setLoading] = useState(false)



    // get profile data
    const { data: user, isLoading, isError } = useGetMe();
    const queryClient = useQueryClient();

    // Edit Profile Data
    const onSubmitProfile = async (formData) => {
        const dataToSend = new FormData();

        dataToSend.append("name", formData.name);
        dataToSend.append("phone", formData.phone);
        dataToSend.append("city", formData.city);

        if (selectedFile) {
            dataToSend.append("photo", selectedFile);
        }

        try {
            setLoading(true)
            const res = await api.patch("/profile", dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            SuccessToast(res?.data?.message || "Profile updated successfully!"); 
            
            queryClient.invalidateQueries({ queryKey: ["me"] });
            setSelectedFile(null);
            setPreviewImage(null);
            setLoading(false)
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || "Something went wrong!";
            ErrorToast(message);
        }
    };

    // Change Profile Image
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const imageURL = URL.createObjectURL(file);
            setPreviewImage(imageURL);
        } else {
            setSelectedFile(null);
            setPreviewImage(null);
        }
    };

    // Change Password
    const onSubmitPassword = async (fromData) => {
        setLoading(true)
        try {
            const changePass = {
                old_password: fromData.currentPassword,
                new_password: fromData.newPassword
            }
            const res = await api.post("/profile/change-password", changePass)
            SuccessToast(res?.data?.message)
            setLoading(false)
        } catch (error) {
            const message = error?.response?.data?.message
            if (message === "Invalid password") {
                ErrorToast("Invalid Current Password")
            } else { 
                ErrorToast("Something Went Wrong")
            }
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
                                        
                                        src={previewImage || user?.photo_url || "https://avatar.iran.liara.run/public/boy"}
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
                                <EditProfiletab {...{ activeTab, handleSubmit, onSubmitProfile, register, user, loading }} />
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
                                <EditPassTab {...{ activeTab, handleSubmit, onSubmitPassword, register, loading }} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div >
        </PageContainer >
    );
};

export default Page;