import React from 'react';

const PaymentsTable = ({ paged, handleModalOpen }) => {
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
                        <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paged.map((u) => (
                        <tr
                            key={u.id}
                            className={`odd:bg-gray-50`}>
                            <td className="px-4 py-3">{u.id}</td>
                            <td className="px-4 py-3 flex items-center gap-2">
                                <img src={u.avatar} alt="" className="w-9 h-9 rounded-full" />
                                {u.name}
                            </td>
                            <td className="px-4 py-3">{u.service}</td>
                            <td className="px-4 py-3">{u.email}</td>
                            <td className="px-4 py-3">{u.phone}</td>
                            <td className="px-4 py-3">{u.location}</td>
                            <td className="px-4 py-3 flex justify-center">
                                <button
                                    disabled={u.paid}
                                    onClick={() => handleModalOpen(u)}
                                    className={` px-2 h-9 cursor-pointer rounded-full flex items-center justify-center font-medium text-sm transition-all duration-200 shadow-sm ${u.paid
                                        ? "bg-green-100 text-green-600 border border-green-400 hover:bg-green-200 hover:border-green-600 disabled:cursor-not-allowed"
                                        : "bg-yellow-50 text-yellow-700 border border-yellow-500 hover:bg-yellow-100 hover:border-yellow-600"}`}
                                >
                                    {u.paid ? "✅ Paid" : "💸 Requested"}
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