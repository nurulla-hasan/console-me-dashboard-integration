import { MdBlockFlipped } from "react-icons/md";

const UserTable = ({ paged, handleBlock }) => {
    return (
        <>
            <table className="min-w-full text-sm ">
                <thead className="bg-[#00A89D] text-white sticky top-0">
                    <tr>
                        <th className="px-4 py-3 text-left">#SI</th>
                        <th className="px-4 py-3 text-left">User Name</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Contact Number</th>
                        <th className="px-4 py-3 text-left">Location</th>
                        <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paged.map((user) => (
                        <tr
                            key={user.id}
                            className={`odd:bg-gray-50`}>
                            <td className="px-4 py-3">{user.id}</td>
                            <td className="px-4 py-3 flex items-center gap-2">
                                <img src={user.avatar} alt="" className="w-9 h-9 rounded-full" />
                                {user.name}
                            </td>
                            <td className="px-4 py-3">{user.email}</td>
                            <td className="px-4 py-3">{user.phone}</td>
                            <td className="px-4 py-3">{user.location}</td>
                            <td className="px-4 py-3 flex justify-center">
                                <button
                                    onClick={() => handleBlock(user.id)}
                                    className={`w-12 h-9 flex items-center justify-center rounded cursor-pointer transition-all duration-300 ${user.blocked
                                        ? "bg-red-200 text-red-600 hover:bg-red-300 border border-red-300"
                                        : "bg-green-200 text-green-700 hover:bg-green-300 border border-green-300"
                                        } `}
                                >
                                    <MdBlockFlipped size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default UserTable;