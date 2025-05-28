"use client";
import { blockUser } from "@/lib/mutations/blockUser";
import { ErrorToast, SuccessToast } from "@/utils/ValidationToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBlockConsult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blockUser,
    onSuccess: (data) => {
      SuccessToast(data.message);
      queryClient.invalidateQueries({ queryKey: ["consultants"] });
    },
    onError: (error) => {
      ErrorToast(error.response?.data?.message || error.message || "Failed to update user status.");
    },
  });
};
