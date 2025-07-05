"use client";
import React, { useState } from 'react';
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
import { SuccessToast, ErrorToast } from '@/utils/ValidationToast';
import { useTransferFunds } from "@/hooks/useTransferFunds";
import NoData from '@/components/no-data/NoData';

export const Payments = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [selectedWithdrawRequest, setSelectedWithdrawRequest] = useState(null);

  // Fetch all withdraw requests
  const {
    data: withdrawRequestsData,
    isLoading: isLoadingRequests,
    isError: isErrorRequests,
  } = useQuery({
    queryKey: ["withdrawRequests", page],
    queryFn: () => getWithdrawRequest(page), 
    staleTime: 5 * 60 * 1000,
  });

  const allWithdrawRequests = withdrawRequestsData?.withdrawRequests || []; 
  const currentPage = withdrawRequestsData?.currentPage || 1;
  const totalPages = withdrawRequestsData?.totalPages || 1;
  const totalwithdrawRequests = withdrawRequestsData?.totalwithdrawRequest || 0;

  // Mutation for updating withdraw request status
  const updateStatusMutation = useMutation({
    mutationFn: updateWithdrawRequestStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['withdrawRequests', page] });
      // SuccessToast(data?.message || "Withdraw request status updated successfully!");
      setShowModal(false);
      setSelectedWithdrawRequest(null);
    },
    onError: (error) => {
      // ErrorToast(error.message || "Failed to update withdraw request status.");
    },
  });

  const transferFundsMutation = useTransferFunds();

  // Modal Handling Functions
  const handleModalOpen = (withdraw) => {
    setSelectedWithdrawRequest(withdraw);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedWithdrawRequest(null);
  };

  const handleStatusUpdate = async (id, status, amount, destinationAccountId) => {
    updateStatusMutation.mutate({ id, status });

    if (status === "completed") {
      if (amount && destinationAccountId) {
        try {
          const amountInCents = amount;
          await transferFundsMutation.mutateAsync({
            amountCents: amountInCents,
            destinationAccountId: destinationAccountId,
          });
          SuccessToast("Funds transfer initiated successfully!");
        } catch (transferError) {
          ErrorToast(transferError.message || "Failed to initiate fund transfer.");
        }
      } else {
        ErrorToast("Funds transfer failed: Missing crucial payment details.");
      }
    }
    if (status === "failed") {
      SuccessToast("Successfully Declined");
    }
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

        {/* <div className="relative w-72">
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
        </div> */}
      </motion.div>

      {/* table */}
      <motion.div
        className="overflow-auto h-[75vh] scrl-hide rounded-md border border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {isLoadingRequests ? (
          <Loading />
        ) : isErrorRequests ? (
          <Error itemName="withdraw requests" />
        ) : (
          <>
            {allWithdrawRequests.length === 0 ? (
              <div className="flex justify-center items-center">
                <NoData />
              </div>
            ) : (
              <PaymentsTable
                pagedRequests={allWithdrawRequests}
                handleModalOpen={handleModalOpen}
              />
            )}
          </>
        )}
      </motion.div>

      <PaymentModal
        showModal={showModal}
        selectedWithdrawRequest={selectedWithdrawRequest}
        handleClose={handleModalClose}
        handleStatusUpdate={handleStatusUpdate}
        isUpdatingStatus={updateStatusMutation.isPending || transferFundsMutation.isPending}
      />

      {/* pagination */}
      {!isLoadingRequests && !isErrorRequests && totalwithdrawRequests > 0 && (
        <motion.div
          className="flex justify-evenly items-center text-sm mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <span className="text-[#00A89D]">
            Showing {(currentPage - 1) * 10 + 1}–{Math.min(currentPage * 10, totalwithdrawRequests)} of {totalwithdrawRequests}
          </span>
          <div className="flex items-center gap-2">
            <Pagination
              page={currentPage}
              setPage={setPage}
              pageCount={totalPages}
            />
          </div>
        </motion.div>
      )}
    </PageContainer>
  );
};

export default Payments;