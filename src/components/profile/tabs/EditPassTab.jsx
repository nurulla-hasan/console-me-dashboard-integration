import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner9 } from "react-icons/im";

const EditPassTab = ({ activeTab, onSubmitPassword, loading }) => {
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm();

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
                            {...register('currentPassword', {
                                required: 'Current password is required',
                            })}
                            className="w-full border border-teal-400 rounded-xl p-2 pr-10 outline-none"
                        />
                        <span
                            className="absolute right-3 top-10 cursor-pointer text-gray-500"
                            onClick={() => toggleShow("current")}
                        >
                            {showPassword.current ? <FiEyeOff color="#1ac0b896" size={20} /> : <FiEye color="#1ac0b896" size={20} />}
                        </span>
                        {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>}
                    </div>

                    {/* New Password */}
                    <div className="relative">
                        <label className="block mb-1 font-medium">New Password</label>
                        <input
                            type={showPassword.new ? "text" : "password"}
                            {...register('newPassword', {
                                required: 'New password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
                            className="w-full border border-teal-400 rounded-xl p-2 pr-10 outline-none"
                        />
                        <span
                            className="absolute right-3 top-10 cursor-pointer text-gray-500"
                            onClick={() => toggleShow("new")}
                        >
                            {showPassword.new ? <FiEyeOff color="#1ac0b896" size={20} /> : <FiEye color="#1ac0b896" size={20} />}
                        </span>
                        {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
                    </div>

                    {/* Confirm New Password */}
                    <div className="relative">
                        <label className="block mb-1 font-medium">Confirm New Password</label>
                        <input
                            type={showPassword.confirm ? "text" : "password"}
                            {...register('confirmPassword', {
                                required: 'Please confirm your new password',
                                validate: value =>
                                    value === watch('newPassword') || 'Passwords do not match',
                            })}
                            className="w-full border border-teal-400 rounded-xl p-2 pr-10 outline-none"
                        />
                        <span
                            className="absolute right-3 top-10 cursor-pointer text-gray-500"
                            onClick={() => toggleShow("confirm")}
                        >
                            {showPassword.confirm ? <FiEyeOff color="#1ac0b896" size={20} /> : <FiEye color="#1ac0b896" size={20} />}
                        </span>
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    <div className='w-full text-center'>
                        <button type="submit" disabled={loading} className="disabled:cursor-not-allowed mt-4 px-8 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-xl cursor-pointer">
                            {
                                loading ? <ImSpinner9 size={20} className="animate-spin" /> : 'Save Changes'
                            }
                        </button>
                    </div>
                </form>
            )}
        </>
    );
};

export default EditPassTab;
