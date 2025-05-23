"use client";
import { useQuery } from "@tanstack/react-query";
import Card from "@/components/card/category-card/Card";
import PageContainer from "@/components/container/PageContainer";
import CategoryModal from "@/components/modal/category-modal/CategoryModal";
import Pagination from "@/components/pagination/Pagination";
import { useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import { motion } from "framer-motion";
import {
    useAddCategory,
    useUpdateCategory,
    useDeleteCategory,
} from "@/hooks/useCategoryMutations";
import toast from "react-hot-toast";
import NoData from "@/components/no-data/NoData";
import Loading from "@/components/loading/Loading";
import { getCategories } from "@/lib/queries/getCategories";
import Error from "@/components/error/Error";

export default function CategoryManagement() {
    const { mutate: addCategory } = useAddCategory();
    const { mutate: updateCategory } = useUpdateCategory();
    const { mutate: deleteCategory } = useDeleteCategory();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryIcon, setCategoryIcon] = useState(null);
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [page, setPage] = useState(1);

    // Get Categories
    const { data: categories = [], isLoading, isError } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const categoriesPerPage = 20;
    const pageCount = Math.ceil(categories.length / categoriesPerPage);
    const paginatedCategories = categories.slice(
        (page - 1) * categoriesPerPage,
        page * categoriesPerPage
    );


    // Add
    const handleAddNewModal = () => {
        setEditMode(false);
        setCategoryName("");
        setCategoryIcon(null);
        setEditCategoryId(null);
        setIsModalOpen(true);
    };

    // edit
    const handleEdit = (category) => {
        setEditMode(true);
        setEditCategoryId(category.id);
        setCategoryName(category.name);
        setCategoryIcon(category.icon);
        setIsModalOpen(true);
    };

    // delete
    const handleDelete = (category) => {
        deleteCategory(category.id, {
            onSuccess: () => toast.success("Category deleted!"),
            onError: () => toast.error("Failed to delete category"),
        });
    };

    const handleSubmit = () => {
        if (!categoryName || !categoryIcon) {
            toast.error("Name and Icon are required");
            return;
        }

        const newCategory = {
            name: categoryName,
            icon: categoryIcon,
        };

        if (editMode && editCategoryId) {
            updateCategory(
                { id: editCategoryId, updatedCategory: newCategory },
                {
                    onSuccess: () => {
                        toast.success("Category updated!");
                        setIsModalOpen(false);
                    },
                    onError: () => toast.error("Failed to update category"),
                }
            );
        } else {
            addCategory(newCategory, {
                onSuccess: () => {
                    toast.success("Category added!");
                    setIsModalOpen(false);
                },
                onError: () => toast.error("Failed to add category"),
            });
        }
    };

    const handleIconUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const tempUrl = URL.createObjectURL(file);
            setCategoryIcon(tempUrl);
        }
    };

    return (
        <PageContainer>
            <motion.div
                className="flex justify-between mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <h1 className="text-xl font-medium text-[#333333]">
                    Category Management
                </h1>
                <button
                    className="bg-teal-500 text-white px-4 py-2 rounded flex items-center gap-1 cursor-pointer"
                    onClick={handleAddNewModal}
                >
                    <HiOutlinePlusSm size={20} color="#ffffff" />
                    Add Category
                </button>
            </motion.div>

            <div className="flex flex-col justify-between h-[79vh]">
                {/* Loader / Error / No Data */}
                {isLoading ? (
                    <Loading />
                ) : isError ? (
                    <Error itemName={'categories'} />
                ) : paginatedCategories.length === 0 ? (
                    <div className="mb-4">
                        <NoData />
                    </div>
                ) : null}

                {/* Category Grid */}
                {!isLoading && !isError && paginatedCategories.length > 0 && (
                    <motion.div
                        className="overflow-auto p-1 scrl-hide grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        {paginatedCategories.map((category) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.03 }}
                            >
                                <Card
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete}
                                    category={category}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Pagination */}
                {!isLoading && !isError && (
                    <motion.div
                        className="flex justify-evenly items-center text-sm mt-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                    >
                        <span className="text-[#00A89D]">
                            Showing {(page - 1) * categoriesPerPage + 1}-
                            {Math.min(page * categoriesPerPage, categories.length)} of{" "}
                            {categories.length}
                        </span>

                        <div className="flex items-center gap-2">
                            <Pagination page={page} setPage={setPage} pageCount={pageCount} />
                        </div>
                    </motion.div>
                )}
            </div>

            <CategoryModal
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                setCategoryName={setCategoryName}
                editMode={editMode}
                categoryName={categoryName}
                handleIconUpload={handleIconUpload}
                handleSubmit={handleSubmit}
            />
        </PageContainer>
    );
}
