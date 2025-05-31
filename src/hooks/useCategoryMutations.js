import { api } from "@/lib/api/axiosInstance";
import { ErrorToast } from "@/utils/ValidationToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Add Category
export const useAddCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData) => {
            const res = await api.post("/admin/category/add", formData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
            console.error("Add Category Error:", error.response?.data || error.message);
        }
    });
};

// Update Category
export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData) => { 
            const res = await api.patch("/admin/category/update", formData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
            console.error("Update Category Error:", error.response?.data || error.message);
        }
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const res = await api.delete(`/admin/category/delete?id=${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
            console.error("Delete Category Error:", error.response?.data || error.message);
            ErrorToast("Failed to delete category");
        }
    });
};