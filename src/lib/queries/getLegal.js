import { api } from "../api/axiosInstance";

export const getLegal = async () => {
  const res = await api.get(`/admin/legal`,);
  return res.data;
};
