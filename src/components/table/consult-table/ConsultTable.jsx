import React from 'react';

const ConsultTable = ({ paged, handleModalOpen }) => {
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
                    {paged?.map((user) => (
                        <tr key={user.id} className={`odd:bg-gray-50`}>
                            <td className="px-4 py-3">{user.id}</td>
                            <td className="px-4 py-3 flex items-center gap-2">
                                <img src={user.avatar} alt="" className="w-9 h-9 rounded-full" />
                                {user.name}
                            </td>
                            <td className="px-4 py-3">{user.service}</td>
                            <td className="px-4 py-3">{user.email}</td>
                            <td className="px-4 py-3">{user.phone}</td>
                            <td className="px-4 py-3">{user.location}</td>
                            <td className="px-4 py-3 flex justify-center">
                                <button
                                    disabled={user.verified}
                                    onClick={() => handleModalOpen(user)}
                                    className={`w-22 py-2 flex items-center justify-center rounded cursor-pointer transition-all duration-300 ${!user.verified
                                        ? " bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600 border border-red-300"
                                        : "bg-green-100 text-green-700 hover:bg-green-200 disabled:cursor-not-allowed border border-green-300"
                                        }`}
                                >
                                    {!user.verified ? "Unverified" : "Verified"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ConsultTable;