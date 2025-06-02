import { api } from "../api/axiosInstance";

export const getNotificationsCount = async () => { 
    try {
        const res = await api.get("/notifications/count"); 
        return res.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error; 
    }
};