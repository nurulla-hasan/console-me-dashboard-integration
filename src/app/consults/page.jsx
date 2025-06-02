// app/dashboard/admin/consults/page.jsx
"use client";
import PageContainer from "@/components/container/PageContainer";
import ConsultantModal from "@/components/modal/consultant-modal/ConsultantModal";
import Pagination from "@/components/pagination/Pagination";
import ConsultTable from "@/components/table/consult-table/ConsultTable";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import Loading from "@/components/loading/Loading";
import NoData from "@/components/no-data/NoData";
import { useBlockConsult } from "@/hooks/useBlockConsult";
import Error from "@/components/error/Error";
import { getConsultants } from "@/lib/queries/getConsultants";
import { useQuery } from "@tanstack/react-query";

export const Consults = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [blockingUserId, setBlockingUserId] = useState(null);

  // Get consultants and pagination
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["consultants", page, query],
    queryFn: () => getConsultants(page, query),
    keepPreviousData: true,
  });

  const consultants = data?.consultants || [];
  const total = data?.totalConsultants || 0;
  const pageCount = data?.totalPages || 1;


  const handleModalOpen = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const { mutate: handleBlockUser, isPending: isBlockingPending } = useBlockConsult();
  const onBlockClick = (id) => {
    setBlockingUserId(id);
    handleBlockUser(id);
    setShowModal(false);
  };

  const handleReject = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!isBlockingPending && blockingUserId) {
      setBlockingUserId(null);
    }
  }, [isBlockingPending, blockingUserId]);


  return (
    <PageContainer>
      {/* header + search */}
      <motion.div
        className="flex justify-between mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-xl font-medium">Consultant Management</h1>
        <div className="relative w-72">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            placeholder="Search here..."
            value={query}
            onChange={(e) => {
              setPage(1);
              setQuery(e.target.value);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-xs border border-[#00A89D] focus:outline-none"
          />
        </div>
      </motion.div>

      {/* table */}
      <motion.div
        className="overflow-x-auto h-[73.5vh] scrl-hide rounded-md border border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <Error itemName='consultants' />
        ) : (
          <>
            {consultants.length === 0 ? (
                <div className="flex justify-center items-center">
                    <NoData message={query ? `No consultants found for "${query}"` : "No consultants available yet."} />
                </div>
            ) : (
              <ConsultTable
                paged={consultants}
                handleModalOpen={handleModalOpen}
                currentlyBlockingUserId={blockingUserId}
              />
            )}
          </>
        )}
      </motion.div>

      {/* Modal ----------------------------------------------------------*/} 
      <ConsultantModal
        showModal={showModal}
        selectedUser={selectedUser}
        handleReject={handleReject}
        handleAccept={onBlockClick}
      />

      {/* pagination */}
      {!isLoading && !isError && consultants > 0 && (
        <motion.div
          className="flex justify-evenly items-center text-sm mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <span className="text-[#00A89D]">
            Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, total)} of {total}
          </span>
          <div className="flex items-center gap-2">
            <Pagination page={page} setPage={setPage} pageCount={pageCount} />
          </div>
        </motion.div>
      )}
    </PageContainer>
  );
}

export default Consults;