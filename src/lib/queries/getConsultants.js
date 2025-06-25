import { api } from "../api/axiosInstance";

export const getConsultants = async (pageNumber = 1, query = "") => {
  try {
    const res = await api.get(`/admin/users/consultants`,
      {
        params: {
          page: pageNumber,
          limit: 10,
          query: query
        }
      }
    );

    const { data, meta } = res.data;

    return {
      consultants: data,
      totalPages: meta.totalPages,
      currentPage: meta.currentPage,
      totalConsultants: meta.totalUsers,
    };

  } catch (error) {
    throw error;
  }
};
