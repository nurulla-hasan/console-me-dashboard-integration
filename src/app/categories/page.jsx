"use client";
import { useQuery } from "@tanstack/react-query";
import Card from "@/components/card/category-card/Card";
import PageContainer from "@/components/container/PageContainer";
import CategoryModal from "@/components/modal/category-modal/CategoryModal";
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
import { ErrorToast, SuccessToast } from "@/utils/ValidationToast";

export default function CategoryManagement() {
  const { mutate: addCategory } = useAddCategory();
  const { mutate: updateCategory } = useUpdateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [originalCategoryIconUrl, setOriginalCategoryIconUrl] = useState(null);

  // Get Categories
  const { data: queryResult, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const categories = queryResult?.data || [];

  // Add
  const handleAddNewModal = () => {
    setEditMode(false);
    setCategoryName("");
    setCategoryIcon(null);
    setEditCategoryId(null);
    setOriginalCategoryIconUrl(null);
    setIsModalOpen(true);
  };

  // edit
  const handleEdit = (category) => {
    setEditMode(true);
    setEditCategoryId(category._id);
    setCategoryName(category.name);
    setCategoryIcon(null);
    setOriginalCategoryIconUrl(category.icon_url);
    setIsModalOpen(true);
  };

  // delete
  const handleDelete = (category) => {
    deleteCategory(category._id, {
      onSuccess: () => toast.success("Category deleted!"),
      onError: () => toast.error("Failed to delete category"),
    });
  };

  const handleSubmit = () => {
    if (!categoryName) {
      ErrorToast("Category name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);

    if (editMode && editCategoryId) {
      formData.append("id", editCategoryId);


      if (categoryIcon instanceof File) {
        formData.append("icon", categoryIcon);
      }

      updateCategory(formData, {
        onSuccess: () => {
          toast.success("Category updated!");
          setIsModalOpen(false);
        },
        onError: (error) => {
          console.error("Update error:", error.response?.data || error.message);
          toast.error(error.response?.data?.message || "Failed to update category");
        },
      });
    } else { 
      if (!categoryIcon instanceof File) {
        toast.error("Category icon is required");
        return;
      }
      formData.append("icon", categoryIcon);

      addCategory(formData, {
        onSuccess: () => {
          SuccessToast("Category added!");
          setIsModalOpen(false);
        },
        onError: (error) => {
          console.error("Add error:", error.response?.data || error.message);
          ErrorToast(error.response?.data?.message || "Failed to add category");
        },
      });
    }
  };

  const handleIconUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryIcon(file);
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
        ) : categories.length === 0 ? (
          <div className="mb-4">
            <NoData />
          </div>
        ) : (
          <motion.div
            className="overflow-auto p-1 scrl-hide grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {categories.map((category) => (
              <motion.div
                key={category._id}
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
      </div>

      <CategoryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        setCategoryName={setCategoryName}
        editMode={editMode}
        categoryName={categoryName}
        handleIconUpload={handleIconUpload}
        handleSubmit={handleSubmit}
        categoryIcon={categoryIcon}
        originalCategoryIconUrl={originalCategoryIconUrl}
      />
    </PageContainer>
  );
}