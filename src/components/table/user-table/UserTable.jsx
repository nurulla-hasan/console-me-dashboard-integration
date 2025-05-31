import { ImSpinner9 } from "react-icons/im"; 
const UserTable = ({ users, onBlockClick, currentlyBlockingUserId }) => { 

    return (
        <>
            <table className="min-w-full text-sm ">
                <thead className="bg-[#00A89D] text-white sticky top-0">
                    <tr>
                        <th className="px-4 py-3 text-left">#SI</th>
                        <th className="px-4 py-3 text-left">User Name</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Contact Number</th>
                        <th className="px-4 py-3 text-left">Balance</th>
                        <th className="px-4 py-3 text-left">Account Status</th>
                        <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        const isBlockingThisUser = currentlyBlockingUserId === user?._id;

                        return (
                            <tr
                                key={user?._id}
                                className={`hover:bg-gray-100 transition-all duration-300`}>
                                <td className="px-4 py-3">{index+1}</td>
                                <td className="px-4 py-3 flex items-center gap-2">
                                    {user?.name}
                                </td>
                                <td className="px-4 py-3">{user?.email}</td>
                                <td className="px-4 py-3">{user?.phone}</td>
                                <td className="px-4 py-3">{user?.balance}</td>
                                <td className="px-4 py-3">{user?.account_status}</td>
                                <td className="px-4 py-3 flex justify-center">
                                    <button
                                        disabled={isBlockingThisUser}
                                        onClick={() => onBlockClick(user?._id)}
                                        className={`w-20 py-2 flex items-center justify-center rounded-xs cursor-pointer transition-all duration-300 ${user?.account_status === "Banned"
                                            ? "bg-red-200 text-red-600 hover:bg-red-300 border border-red-300"
                                            : "bg-green-200 text-green-700 hover:bg-green-300 border border-green-300"
                                            } `}
                                    >
                                        {
                                            isBlockingThisUser ? <ImSpinner9 size={20} className="animate-spin" /> : user?.account_status === "Banned" ? "Unblock" : "Block"
                                        }
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
};

export default UserTable;