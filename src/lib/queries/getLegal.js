import { api } from "../api/axiosInstance";

export const getLegal = async (type) => {
  const res = await api.get(`/legal?type=${type}`);
  return res.data;
};