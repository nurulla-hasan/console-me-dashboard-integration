"use client"
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { ImSpinner9 } from "react-icons/im"; 
import { useState, useEffect } from "react"; 

const PaymentModal = ({ showModal, selectedWithdrawRequest, handleClose, handleStatusUpdate, isUpdatingStatus }) => {
    const [actionLoadingStatus, setActionLoadingStatus] = useState(null); 

    useEffect(() => {
        if (!showModal || !isUpdatingStatus) {
            setActionLoadingStatus(null);
        }
    }, [showModal, isUpdatingStatus]); 

    if (!showModal || !selectedWithdrawRequest) {
        return null;
    }

    const requestId = selectedWithdrawRequest._id;
    const userName = selectedWithdrawRequest.user?.name || "Unknown User";
    const userEmail = selectedWithdrawRequest.user?.email || "N/A";
    const userService = selectedWithdrawRequest.user?.service?.name || "N/A";
    const userLocation = `${selectedWithdrawRequest.user?.city || 'N/A'}, ${selectedWithdrawRequest.user?.country || 'N/A'}`;
    const amount = selectedWithdrawRequest.amount || 0;
    const currentStatus = selectedWithdrawRequest.status;

    const isFinalized = currentStatus === "completed" || currentStatus === "failed";

    const handleActionClick = async (statusToUpdate) => {
        setActionLoadingStatus(statusToUpdate);
        try {
            await handleStatusUpdate(requestId, statusToUpdate);
        } catch (error) {
            setActionLoadingStatus(null);
        }
    };

    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    className="fixed h-[100vh] inset-0 flex justify-center items-center bg-black/50 bg-opacity-50 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    onClick={handleClose}
                >
                    <motion.div
                        className="bg-white rounded-sm min-w-lg p-4 relative"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        transition={{ duration: 0.1 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-6 hover:text-red-500 text-2xl text-white cursor-pointer"
                            aria-label="Close modal"
                        >
                            <RxCross2 />
                        </button>

                        <div className="bg-[#00a89dbc] rounded-sm h-52 flex gap-3 justify-center items-center flex-col mb-4">
                            <div className="flex flex-col justify-center items-center text-white">
                                <h1 className="font-medium text-2xl">{userName}</h1>
                                <p>{userService}</p>
                            </div>
                        </div>
                        <div className="mb-10 px-6">
                            <div className="space-y-4 *:space-y-1">
                                <div>
                                    <h3 className="text-md font-medium">User Email</h3>
                                    <p className="text-xs">{userEmail}</p>
                                </div>
                                <div>
                                    <h3 className="text-md font-medium">Location</h3>
                                    <p className="text-xs">{userLocation}</p>
                                </div>
                                <div>
                                    <h3 className="text-md font-medium">Amount</h3>
                                    <p className="text-xs">${amount}</p>
                                </div>
                                <div>
                                    <h3 className="text-md font-medium">Current Status</h3>
                                    <p className="text-xs capitalize">{currentStatus}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between gap-8 px-6">
                            <button
                                onClick={() => handleActionClick("failed")}
                                disabled={isFinalized || (actionLoadingStatus === "failed" && isUpdatingStatus)}
                                className={`border text-black py-1 w-full rounded-xs cursor-pointer transition-colors duration-200
                                    ${isFinalized || (actionLoadingStatus === "failed" && isUpdatingStatus)
                                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                        : "hover:bg-red-50 hover:text-red-700 border-red-500"
                                    }
                                `}
                            >
                                {actionLoadingStatus === "failed" && isUpdatingStatus ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <ImSpinner9 size={16} className="animate-spin" /> Declining...
                                    </div>
                                ) : "Decline"}
                            </button>
                            <button
                                onClick={() => handleActionClick("completed")}
                                disabled={isFinalized || (actionLoadingStatus === "completed" && isUpdatingStatus)}
                                className={`bg-teal-600 text-white py-1 w-full rounded-xs cursor-pointer transition-colors duration-200
                                    ${isFinalized || (actionLoadingStatus === "completed" && isUpdatingStatus)
                                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                        : "hover:bg-teal-700"
                                    }
                                `}
                            >
                                {actionLoadingStatus === "completed" && isUpdatingStatus ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <ImSpinner9 size={16} className="animate-spin" /> Accepting...
                                    </div>
                                ) : "Accept"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PaymentModal;