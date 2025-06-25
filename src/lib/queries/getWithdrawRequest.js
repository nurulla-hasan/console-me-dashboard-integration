import { api } from "../api/axiosInstance"

export const getWithdrawRequest = async (pageNumber = 1) => {
    try {
        const res = await api.get("/admin/payments/withdraw-requests",
            {
                params: {
                    page: pageNumber,
                    limit: 10
                }
            }
        )

        const { data, meta } = res.data
        return {
            withdrawRequests: data,
            currentPage: meta.page,
            totalPages: meta.totalPages,
            totalwithdrawRequest: meta.total,
        }

    } catch (error) {
        throw error;
    }
}  