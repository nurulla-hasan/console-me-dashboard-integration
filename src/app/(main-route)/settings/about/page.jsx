"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect, useState, useMemo } from "react";
import { ErrorToast, SuccessToast } from "@/utils/ValidationToast";
import { getLegal } from "@/lib/queries/getLegal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { updateLegal } from "@/lib/mutations/updateLegal";
import Loading from "@/components/loading/Loading";
import { ImSpinner9 } from "react-icons/im";

// Dynamically import JoditEditor (SSR off)
const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
    loading: () => <Loading />
});

const AboutUs = () => {
    const [content, setContent] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const editor = useRef(null);
    const queryClient = useQueryClient();

    const { data: legalData, isLoading, isError } = useQuery({
        queryKey: ["legal", "about"],
        queryFn: () => getLegal("about"),
    });

    useEffect(() => {
        if (!isLoading && !isError && legalData?.data?.content) {
            setContent(legalData.data.content);
        }
    }, [legalData, isLoading, isError]);

    const handleSubmit = async () => {
        if (!content || content.trim() === "") {
            ErrorToast("Content is required");
            return;
        }

        setIsSaving(true);
        try {
            await updateLegal({
                type: "about",
                content,
            });
            SuccessToast("About updated successfully");
            queryClient.invalidateQueries({ queryKey: ["legal", "About"] });
        } catch (error) {
            ErrorToast("Failed to update About. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const editorConfig = useMemo(() => ({
        readonly: false,
        height: 500,
        style: {
            backgroundColor: "#fff",
            color: "#000",
            fontSize: "16px",
        },
        toolbarAdaptive: false,
        toolbarSticky: false,
        showCharsCounter: true,
        showWordsCounter: true,
        showXPathInStatusbar: false,
        placeholder: "Write your Terms & Conditions here...",
    }), []);
    return (
        <div className="bg-[#F6F6F6] min-h-[calc(100vh-96px)] p-4">
            {!isLoading ? (
                <div className="bg-white rounded shadow p-4">
                    <JoditEditor
                        ref={editor}
                        value={content}
                        onBlur={(newContent) => setContent(newContent)}
                        config={editorConfig}
                    />
                </div>
            ) : (
                <Loading />
            )}

            <div className="flex py-6 justify-center">
                <button
                    onClick={handleSubmit}
                    disabled={isSaving}
                    className="px-8 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSaving ? (
                        <div className="flex gap-2 items-center">
                            <ImSpinner9 size={20} className="animate-spin" />
                            Processing...
                        </div>
                    ) : (
                        "Save"
                    )}
                </button>
            </div>
        </div>
    );
};

export default AboutUs;
