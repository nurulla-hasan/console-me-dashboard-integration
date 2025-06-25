import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/axiosInstance";

const transferFunds = async ({ amountCents, destinationAccountId }) => {
  const response = await api.post("/admin/payments/transfer-funds", {
    amountCents,
    destinationAccountId,
  });
  return response.data;
};

export const useTransferFunds = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: transferFunds,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["withdraw-requests"]);
      queryClient.invalidateQueries(["user-balance", variables.destinationAccountId]);
    },
    onError: (error) => {
      
    },
  });
};