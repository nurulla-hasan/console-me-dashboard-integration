import { api } from "../api/axiosInstance";


export const updateWithdrawRequestStatus = async (payload) => {
  const { id, status } = payload; 
  try {
    const res = await api.patch(`/admin/payments/withdraw-requests/update`, { id, status });
    return res.data; 
  } catch (error) {
    console.error(`Error updating withdraw request ${id} status to ${status}:`, error);
    throw error; 
  }
};