"use client";
import PageContainer from "@/components/container/PageContainer";
import ConsultantModal from "@/components/modal/consultant-modal/ConsultantModal";
import Pagination from "@/components/pagination/Pagination";
import ConsultTable from "@/components/table/consult-table/ConsultTable";
import { consult } from "@/data/data";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";


export default function Consults() {
  const pageSize = 8;
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [data, setData] = useState(consult);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleAccept = () => {
    setData((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id ? { ...u, verified: true } : u
      )
    );
    setShowModal(false);
  };

  const handleReject = () => {
    setShowModal(false);
  };

  const filtered = data.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase())
  );
  const pageCount = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

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
            className="w-full pl-10 pr-4 py-2 rounded-md border border-[#00A89D] focus:outline-none"
          />
        </div>
      </motion.div>

      {/* table */}
      <motion.div
        className="overflow-x-auto h-[74vh] scrl-hide rounded-md border border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <ConsultTable paged={paged} handleModalOpen={handleModalOpen} />
      </motion.div>

      {/* Modal */}
      <ConsultantModal
        showModal={showModal}
        selectedUser={selectedUser}
        handleReject={handleReject}
        handleAccept={handleAccept}
      />

      {/* pagination */}
      <motion.div
        className="flex justify-evenly items-center text-sm mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <span className="text-[#00A89D]">
          Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filtered.length)} of {filtered.length}
        </span>
        <div className="flex items-center gap-2">
          <Pagination page={page} setPage={setPage} pageCount={pageCount} />
        </div>
      </motion.div>
    </PageContainer>
  );
}
