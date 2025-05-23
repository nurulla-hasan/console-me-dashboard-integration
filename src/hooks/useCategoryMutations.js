import { api } from "@/lib/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Add Category
export const useAddCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newCategory) => {
            const res = await api.post("/admin/category/add", newCategory);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

// Update Category
export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updatedCategory }) => {
            const res = await api.put(`/admin/category/update?id=${id}`, updatedCategory);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};

// Delete Category
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
    });
};
