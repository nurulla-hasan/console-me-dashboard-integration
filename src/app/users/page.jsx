// app/dashboard/admin/users/page.jsx
"use client";
import PageContainer from "@/components/container/PageContainer";
import Pagination from "@/components/pagination/Pagination";
import UserTable from "@/components/table/user-table/UserTable";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/lib/queries/getUsers";
import { useBlockUser } from "@/hooks/useBlockUser";
import Loading from "@/components/loading/Loading";
import Error from "@/components/error/Error";

export const Users = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [blockingUserId, setBlockingUserId] = useState(null); 

  // Get users and pagination
  const {
    data = { users: [], totalUsers: 0, totalPages: 1, currentPage: 1 },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", page, query],
    queryFn: () => getUsers(page, query),
    keepPreviousData: true,
  });
  const { users, totalUsers, totalPages } = data;

  // Toggle User Block and Unblock
  const { mutate: handleBlockUser, isPending } = useBlockUser();

  const onBlockClick = (id) => {
    setBlockingUserId(id);
    handleBlockUser(id);
  };

  useEffect(() => {
    if (!isPending && blockingUserId) {
      setBlockingUserId(null);
    }
  }, [isPending, blockingUserId]);


  return (
    <PageContainer>
      {/* Header + Search */}
      <motion.div
        className="flex justify-between mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-xl font-medium">User Management</h1>
        <div className="relative w-72">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            placeholder="Search here..."
            value={query}
            onChange={(e) => {
              setPage(1);
              setQuery(e.target.value);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-[#00A89D] focus:outline-none"
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        className="overflow-auto h-[74vh] scrl-hide rounded-md border border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error itemName='users' />
        ) : (
          <UserTable
            users={users}
            onBlockClick={onBlockClick} 
            currentlyBlockingUserId={blockingUserId}
          />
        )}
      </motion.div>

      {/* Pagination */}
      {!isLoading && !isError && (
        <motion.div
          className="flex justify-evenly items-center text-sm mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <span className="text-[#00A89D]">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalUsers)} of {totalUsers}
          </span>

          <div className="flex items-center gap-2">
            <Pagination page={page} setPage={setPage} pageCount={totalPages} />
          </div>
        </motion.div>
      )}
    </PageContainer>
  );
}

export default Users;