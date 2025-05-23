import { api } from "../api/axiosInstance";

export const getCategories = async () => {
  const res = await api.get(`/admin/category/add`,);
  return res.data;
};
