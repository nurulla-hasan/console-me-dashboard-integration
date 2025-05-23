"use client";
import { blockUser } from "@/lib/mutations/blockUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useBlockConsult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blockUser,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["consultants"] });
    },
    onError: () => {
      toast.error("Failed to update user status.");
    },
  });
};
