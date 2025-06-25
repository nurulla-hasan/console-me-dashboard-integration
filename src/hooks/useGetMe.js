import { getUserProfile } from '@/lib/api/auth';
import { useQuery } from '@tanstack/react-query';
import { jwtDecode } from "jwt-decode";

export const useGetMe = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  let userId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded?.id;
    } catch (error) {
      throw error
    }
  }

  return useQuery({
    queryKey: ['me', userId],
    queryFn: async () => {
      if (!token || !userId) { 
         throw new Error("Missing token or user ID for profile fetch.");
      }
      const res = await getUserProfile(userId);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
    enabled: !!token && !!userId,
  });
};