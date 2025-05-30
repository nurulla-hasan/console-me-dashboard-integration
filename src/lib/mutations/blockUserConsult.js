import { api } from "../api/axiosInstance";

export const blockUserConsult = async (id) => {
  const res = await api.post(`/admin/users/ban`,{ user_id: id },);
  return res.data;
};
