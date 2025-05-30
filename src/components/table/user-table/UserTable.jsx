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
                        <th className="px-4 py-3 text-left">Account Status</th>
                        <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        const isBlockingThisUser = currentlyBlockingUserId === user._id;

                        return (
                            <tr
                                key={user._id}
                                className={`odd:bg-gray-50 hover:bg-teal-50`}>
                                <td className="px-4 py-3">{user._id.slice(0, 8)}</td>
                                <td className="px-4 py-3 flex items-center gap-2">
                                    <img src={user.avatar || "https://avatar.iran.liara.run/public"} alt="" className="w-9 h-9 rounded-full" />
                                    {user.name}
                                </td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3">{user.phone}</td>
                                <td className="px-4 py-3">{user.account_status}</td>
                                <td className="px-4 py-3 flex justify-center">
                                    <button
                                        disabled={isBlockingThisUser}
                                        onClick={() => onBlockClick(user._id)}
                                        className={`w-20 h-9 flex items-center justify-center rounded cursor-pointer transition-all duration-300 ${user.account_status === "Banned"
                                            ? "bg-red-200 text-red-600 hover:bg-red-300 border border-red-300"
                                            : "bg-green-200 text-green-700 hover:bg-green-300 border border-green-300"
                                            } `}
                                    >
                                        {
                                            isBlockingThisUser ? <ImSpinner9 size={16} className="animate-spin" /> : user.account_status === "Banned" ? "Unblock" : "Block"
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