"use client"
import { FaRegImage } from 'react-icons/fa';
import { MdOutlineArrowBack } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from 'react';
import { ImSpinner9 } from "react-icons/im";

const CategoryModal = ({
    setIsModalOpen,
    isModalOpen,
    setCategoryName,
    editMode,
    categoryName,
    handleIconUpload,
    handleSubmit,
    categoryIcon,
    originalCategoryIconUrl,
    isSubmitting
}) => {
    const [previewIconUrl, setPreviewIconUrl] = useState(null);

    // Preview image logic
    useEffect(() => {
        if (categoryIcon instanceof File) {
            const url = URL.createObjectURL(categoryIcon);
            setPreviewIconUrl(url);
            return () => URL.revokeObjectURL(url); // Clean up URL
        } else if (editMode && originalCategoryIconUrl && !categoryIcon) {
            setPreviewIconUrl(originalCategoryIconUrl);
        } else {
            setPreviewIconUrl(null);
        }
    }, [categoryIcon, editMode, originalCategoryIconUrl]);

    return (
        <AnimatePresence>
            {isModalOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                >
                    <motion.div
                        className="bg-white text-[#333333] p-8 rounded-xl w-[500px] shadow-lg"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        transition={{ duration: 0.1 }}
                    >
                        <h2 className="text-lg font-medium flex items-center justify-center gap-2 mb-6">
                            <MdOutlineArrowBack
                                onClick={() => setIsModalOpen(false)}
                                className="cursor-pointer"
                                color="#333333"
                                size={20}
                            />
                            {editMode ? "Edit Category" : "Add New Category"}
                        </h2>

                        <div className="mb-4">
                            <label className="block text-sm font-normal mb-2">
                                Category name
                            </label>
                            <input
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                className="w-full border border-[#00A89D] px-3 py-1 rounded-lg outline-none"
                                placeholder="Enter category name"
                                disabled={isSubmitting} 
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-sm font-normal mb-2">
                                Category icon
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleIconUpload}
                                className="w-full border border-[#00A89D] px-3 py-1 rounded-lg outline-none cursor-pointer text-[15px] text-[#3333339b]"
                                id="icon-upload"
                                disabled={isSubmitting} 
                            />
                            {previewIconUrl && (
                                <img
                                    src={previewIconUrl}
                                    alt="Category Icon Preview"
                                    className="mt-2 h-16 w-16 object-cover rounded-full mx-auto"
                                />
                            )}
                            <FaRegImage
                                className="absolute top-9 right-3"
                                size={20}
                                color="#00A89D"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="bg-[#00A89D] text-white w-full py-1 rounded-lg font-medium cursor-pointer flex items-center justify-center gap-2" // flex, items-center, justify-center, gap-2 যোগ করা হয়েছে
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <ImSpinner9 size={20} className="animate-spin" />
                                    {editMode ? "Updating..." : "Adding..."}
                                </>
                            ) : (
                                editMode ? "Update" : "Add Category"
                            )}
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CategoryModal;