"use client";
import { getUserProfile } from '@/lib/api/auth';
import { useQuery } from '@tanstack/react-query';
import { jwtDecode } from "jwt-decode";

export const useGetMe = () => {

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error("No access token");
      }
      const decoded = jwtDecode(token);
      const userId = decoded?.id;
      if (!userId) {
        throw new Error("Invalid token: No user ID found.");
      }

      const res = await getUserProfile(userId);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};