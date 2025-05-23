import { api } from "../api/axiosInstance";
export const getConsultants = async ({ page = 1, search = "" }) => {
  try {
    const res = await api.get(`/admin/users/consultants?page=${page}&limit=10&search=${search}`);

    const { data, meta } = res.data;

    return {
      consultants: data,
      totalPages: meta.totalPages,
      currentPage: meta.currentPage,
      totalConsultants: meta.totalUsers,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
