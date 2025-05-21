import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

const EditPassTab = ({ activeTab, handleSubmit, onSubmitPassword, register }) => {

    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const toggleShow = (key) => {
        setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <>
            {activeTab === 'password' && (
                <form onSubmit={handleSubmit(onSubmitPassword)} className="space-y-4">
                    <h3 className='text-2xl font-medium text-center'>Change Password</h3>

                    {/* Current Password */}
                    <div className="relative">
                        <label className="block mb-1 font-medium">Current Password</label>
                        <input
                            type={showPassword.current ? "text" : "password"}
                            {...register('currentPassword')}
                            className="w-full border border-teal-400 rounded-md p-2 pr-10 outline-none"
                        />
                        <span
                            className="absolute right-3 top-10 cursor-pointer text-gray-500"
                            onClick={() => toggleShow("current")}
                        >
                            {showPassword.current ? <FiEyeOff color="#1ac0b896" size={20}/> : <FiEye color="#1ac0b896" size={20}/>}
                        </span>
                    </div>

                    {/* New Password */}
                    <div className="relative">
                        <label className="block mb-1 font-medium">New Password</label>
                        <input
                            type={showPassword.new ? "text" : "password"}
                            {...register('newPassword')}
                            className="w-full border border-teal-400 rounded-md p-2 pr-10 outline-none"
                        />
                        <span
                            className="absolute right-3 top-10 cursor-pointer text-gray-500"
                            onClick={() => toggleShow("new")}
                        >
                            {showPassword.new ? <FiEyeOff color="#1ac0b896" size={20}/> : <FiEye color="#1ac0b896" size={20}/>}
                        </span>
                    </div>

                    {/* Confirm New Password */}
                    <div className="relative">
                        <label className="block mb-1 font-medium">Confirm New Password</label>
                        <input
                            type={showPassword.confirm ? "text" : "password"}
                            {...register('confirmPassword')}
                            className="w-full border border-teal-400 rounded-md p-2 pr-10 outline-none"
                        />
                        <span
                            className="absolute right-3 top-10 cursor-pointer text-gray-500"
                            onClick={() => toggleShow("confirm")}
                        >
                            {showPassword.confirm ? <FiEyeOff color="#1ac0b896" size={20}/> : <FiEye color="#1ac0b896" size={20}/>}
                        </span>
                    </div>

                    <div className='w-full text-center'>
                        <button type="submit" className="mt-4 px-8 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md cursor-pointer">
                            Save Changes
                        </button>
                    </div>
                </form>
            )}
        </>
    );
};

export default EditPassTab;