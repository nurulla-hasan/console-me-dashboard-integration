import { api } from "../api/axiosInstance";

export const getDashboardData = async(userYear=2025, consultYear=2025, earningYear=2025 ) => {
    const res = await api.get(`/admin/dashboard?user_year=${userYear}&consult_year=${consultYear}&earning_year=${earningYear}`)

    return res.data
}