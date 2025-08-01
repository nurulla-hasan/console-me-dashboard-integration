import { api } from "../api/axiosInstance";
export const getUsers = async (pageNumber = 1, query = "") => {
  try {
    const res = await api.get(`/admin/users`,
      {
        params:{
          page: pageNumber,
          limit: 10,
          query: query
        },
      }
    );

    const { data, meta } = res.data;

    return {
      users: data,
      totalUsers: meta.totalUsers,
      totalPages: meta.totalPages,
      currentPage: meta.currentPage,
    };
  } catch (error) {
    throw error;
  }
};
   