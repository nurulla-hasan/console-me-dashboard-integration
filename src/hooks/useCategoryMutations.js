// hooks/useCategoryMutations.js
import { api } from "@/lib/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast"; // Ensure toast is imported for onError

// Add Category
export const useAddCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData) => { // Expect FormData here
            // Axios will automatically set Content-Type: multipart/form-data for FormData
            const res = await api.post("/admin/category/add", formData);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
            console.error("Add Category Error:", error.response?.data || error.message);
            // ErrorToast("Failed to add category"); // Handled in component for specific toast
        }
    });
};

// Update Category
export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData) => { // Expect FormData here
            // The formData should already contain the 'id' if added in handleSubmit
            // Use PATCH method as per your Postman screenshots
            const res = await api.patch("/admin/category/update", formData); // Changed to api.patch
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
            console.error("Update Category Error:", error.response?.data || error.message);
            // toast.error("Failed to update category"); // Handled in component for specific toast
        }
    });
};

// Delete Category (এটি ঠিক আছে, পরিবর্তনের প্রয়োজন নেই)
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
            toast.error("Failed to delete category");
        }
    });
};