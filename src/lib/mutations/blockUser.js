import { api } from "../api/axiosInstance";

export const blockUser = async (id) => {
  const res = await api.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users/ban`,
    { user_id: id },
  );
  return res.data;
};
