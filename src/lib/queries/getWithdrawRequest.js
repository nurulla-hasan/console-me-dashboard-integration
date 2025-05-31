import { api } from "../api/axiosInstance"

export const getWithdrawRequest = async () => {
    try {
        const res = await api.get("/admin/payments/withdraw-requests")
        return res.data
    } catch (error) {
        console.error("Error fetching withdraw requests:", error);
        throw error;
    }
} 