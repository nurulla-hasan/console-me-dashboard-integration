import NoData from '@/components/no-data/NoData';
import React from 'react';

const PaymentsTable = ({ pagedRequests, handleModalOpen }) => {
    if (!pagedRequests || pagedRequests.length === 0) {
        return (
        <div className='flex justify-center items-center'>
            <NoData />
        </div>
        )
    }

    return (
        <>
            <table className="min-w-full text-sm">
                <thead className="bg-[#00A89D] text-white sticky top-0">
                    <tr>
                        <th className="px-4 py-3 text-left">#SI</th>
                        <th className="px-4 py-3 text-left">User Name</th>
                        <th className="px-4 py-3 text-left">Service Name</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Contact Number</th>
                        <th className="px-4 py-3 text-left">Location</th>
                        <th className="px-4 py-3 text-left">Amount</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-start">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {pagedRequests.map((request, index) => (
                        <tr
                            key={request._id}
                            className={`odd:bg-gray-50 hover:bg-teal-50`}
                        >
                            <td className="px-4 py-3">{index + 1}</td>
                            <td className="px-4 py-3 flex items-center gap-2">
                                {request.user?.name || 'N/A'}
                            </td>
                            <td className="px-4 py-3">{request.user?.service?.name || 'N/A'}</td>
                            <td className="px-4 py-3">{request.user?.email || 'N/A'}</td>
                            <td className="px-4 py-3">{request.user?.phone || 'N/A'}</td>
                            <td className="px-4 py-3">{`${request.user?.city || 'N/A'}, ${request.user?.country || 'N/A'}`}</td>
                            <td className="px-4 py-3">${request.amount}</td>
                            <td className="px-4 py-3 capitalize">{request.status}</td>
                            <td className="px-4 py-3 flex justify-start">
                                <button
                                    disabled={request.status === "completed" || request.status === "failed"}
                                    onClick={() => handleModalOpen(request)}
                                    className={`px-2 py-1 cursor-pointer rounded-xl flex items-center justify-center font-medium text-sm transition-all duration-200 shadow-sm
                                        ${request.status === "completed"
                                            ? "bg-green-100 text-green-600 border border-green-400 disabled:cursor-not-allowed"
                                            : request.status === "failed"
                                                ? "bg-red-100 text-red-600 border border-red-400 disabled:cursor-not-allowed"
                                                : "bg-yellow-50 text-yellow-700 border border-yellow-500 hover:bg-yellow-100 hover:border-yellow-600"
                                        }`}
                                >
                                    {request.status === "completed" ? "✅ Paid" : request.status === "failed" ? "❌ Failed" : "💸 Requested"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default PaymentsTable;