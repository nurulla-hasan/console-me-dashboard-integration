import { api } from "../api/axiosInstance";

export const updateLegal = async (data) => {
  const res = await api.patch(`/admin/legal`, data);
  return res.data;
};