"use client";
import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PageContainer from "@/components/container/PageContainer";
import Pagination from "@/components/pagination/Pagination";
import PaymentsTable from "@/components/table/payments-table/PaymentsTable";
import PaymentModal from "@/components/modal/payment-modal/PaymentModal";
import Loading from "@/components/loading/Loading";
import Error from "@/components/error/Error";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

import { getWithdrawRequest } from "@/lib/queries/getWithdrawRequest";
import { updateWithdrawRequestStatus } from "@/lib/mutations/updateWithdrawRequestStatus";
import { ErrorToast, SuccessToast } from '@/utils/ValidationToast';

export default function Payments() {
  const queryClient = useQueryClient();

  const pageSize = 8;
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedWithdrawRequest, setSelectedWithdrawRequest] = useState(null);

  const {
    data: withdrawRequestsApiResponse,
    isLoading: isLoadingRequests,
    isError: isErrorRequests,
    error: requestsError,
  } = useQuery({
    queryKey: ["withdrawRequests"],
    queryFn: getWithdrawRequest,
    staleTime: 5 * 60 * 1000,
  });

  const updateStatusMutation = useMutation({
    mutationFn: updateWithdrawRequestStatus,
    onSuccess: (data) => {
      SuccessToast(data.message || "Withdraw request status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ['withdrawRequests'] });
      setShowModal(false);
      setSelectedWithdrawRequest(null);
    },
    onError: (error) => {
      ErrorToast(error.response?.data?.message || error.message || "Failed to update withdraw request status.");
    },
  });

  const allWithdrawRequests = withdrawRequestsApiResponse?.data || [];

  const filteredRequests = useMemo(() => {
    if (!query) {
      return allWithdrawRequests;
    }
    const lowerCaseQuery = query.toLowerCase();
    return allWithdrawRequests.filter(request =>
      request.user?.name?.toLowerCase().includes(lowerCaseQuery) ||
      request.user?.email?.toLowerCase().includes(lowerCaseQuery) ||
      request.user?.phone?.includes(lowerCaseQuery) ||
      request.user?.service?.name?.toLowerCase().includes(lowerCaseQuery) ||
      request.user?.city?.toLowerCase().includes(lowerCaseQuery) ||
      request.user?.country?.toLowerCase().includes(lowerCaseQuery) ||
      request._id.toLowerCase().includes(lowerCaseQuery) ||
      request.status.toLowerCase().includes(lowerCaseQuery) ||
      String(request.amount).includes(lowerCaseQuery)
    );
  }, [allWithdrawRequests, query]);

  const totalItems = filteredRequests.length;
  const pageCount = Math.ceil(totalItems / pageSize);
  const pagedRequests = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return filteredRequests.slice(startIndex, startIndex + pageSize);
  }, [filteredRequests, page, pageSize]);

  // Modal Handling Functions
  const handleModalOpen = (withdraw) => {
    setSelectedWithdrawRequest(withdraw);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedWithdrawRequest(null);
  };

  const handleStatusUpdate = (id, status) => {
    updateStatusMutation.mutate({ id, status });
  };

  return (
    <PageContainer>
      {/* header + search */}
      <motion.div
        className="flex justify-between mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-10">
          <h1 className="text-xl font-medium">Payment Withdraw Requests</h1>
        </div>

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
        className="overflow-auto h-[73.5vh] scrl-hide rounded-md border border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {isLoadingRequests ? (
          <Loading />
        ) : isErrorRequests ? (
          <Error itemName="withdraw requests" />
        ) : (
          <PaymentsTable pagedRequests={pagedRequests} handleModalOpen={handleModalOpen} />
        )}
      </motion.div>

      <PaymentModal
        showModal={showModal}
        selectedWithdrawRequest={selectedWithdrawRequest}
        handleClose={handleModalClose}
        handleStatusUpdate={handleStatusUpdate}
        isUpdatingStatus={updateStatusMutation.isPending}
      />

      {/* pagination */}
      {!isLoadingRequests && !isErrorRequests && totalItems > 0 && (
        <motion.div
          className="flex justify-evenly items-center text-sm mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <span className="text-[#00A89D]">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalItems)} of {totalItems}
          </span>
          <div className="flex items-center gap-2">
            <Pagination page={page} setPage={setPage} pageCount={pageCount} />
          </div>
        </motion.div>
      )}
    </PageContainer>
  );
}