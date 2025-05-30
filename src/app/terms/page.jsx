"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { ErrorToast, SuccessToast } from "@/utils/ValidationToast";
import { getLegal } from "@/lib/queries/getLegal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { updateLegal } from "@/lib/mutations/updateLegal";
import Loading from "@/components/loading/Loading";

// Dynamically import JoditEditor (SSR off)
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <Loading />
});

const Terms = () => {
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const editor = useRef(null);
  const queryClient = useQueryClient();

  const { data: legalData, isLoading, isError } = useQuery({
    queryKey: ["legal", "terms"],
    queryFn: () => getLegal("terms"),
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
        type: "terms",
        content,
      });
      SuccessToast("Terms updated successfully");
      queryClient.invalidateQueries({ queryKey: ["legal", "terms"] });
    } catch (error) {
      ErrorToast("Failed to update Terms. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const editorConfig = {
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
  };

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
          className="px-8 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <div className="flex gap-2 items-center">
              <CgSpinnerTwo className="animate-spin" fontSize={16} />
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

export default Terms;
