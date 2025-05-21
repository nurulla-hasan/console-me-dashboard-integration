import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Add Category
export const useAddCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newCategory) => {
            const res = await axios.post("http://localhost:3001/categories", newCategory);
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
            const res = await axios.put(`http://localhost:3001/categories/${id}`, updatedCategory);
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
            const res = await axios.delete(`http://localhost:3001/categories/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
};
