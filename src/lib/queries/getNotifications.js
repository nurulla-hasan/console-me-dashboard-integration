import { api } from "../api/axiosInstance";

export const getNotifications = async () => { 
    try {
        const res = await api.get("/notifications"); 
        return res.data;
    } catch (error) {
        throw error; 
    }
};