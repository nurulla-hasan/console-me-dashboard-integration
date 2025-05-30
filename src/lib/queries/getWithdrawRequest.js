import { api } from "../api/axiosInstance"

export const getWithdrawRequest = async () => {
    const res = api.get("/admin/payments/withdraw-requests")
    return res.data
}