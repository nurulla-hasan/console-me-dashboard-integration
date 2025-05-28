"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "@/components/editor/ToolbarPlugin";
import { useState, useMemo, useEffect } from "react";
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { getLegal } from "@/lib/queries/getLegal";
import { updateLegal } from "@/lib/mutations/updateLegal";
import Loading from "@/components/loading/Loading";
import Error from "@/components/error/Error";
import toast from "react-hot-toast";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const LexicalEditorInstancePlugin = ({ setEditorInstance }) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    setEditorInstance(editor);
  }, [editor, setEditorInstance]);
  return null;
};

const Terms = () => {
  const [content, setContent] = useState("");
  const [editorInstance, setEditorInstance] = useState(null);
  const [isClient, setIsClient] = useState(false); 

  const queryClient = useQueryClient();

  const { data: legalData, isLoading, isError } = useQuery({
    queryKey: ["legal", "terms"],
    queryFn: () => getLegal("terms"),
    enabled: true,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (legalData?.data?.content) {
      setContent(legalData.data.content);
    }
  }, [legalData]);

  const updateLegalMutation = useMutation({
    mutationFn: updateLegal,
    onSuccess: () => {
      queryClient.invalidateQueries(["legal", "terms"]);
      toast.success("Terms and Conditions updated successfully!");
    },
    onError: (error) => {
      console.error("Error updating legal content:", error);
      toast.error("Failed to update Terms and Conditions.");
    },
  });

  // Initialize editor state with fetched content
  const editorConfig = useMemo(() => ({
    theme: {
      paragraph: "editor-paragraph",
    },
    onError(error) {
      console.error(error);
      throw error;
    },
    nodes: [ListNode, ListItemNode, HeadingNode, QuoteNode],
    editorState: () => {
      const root = $getRoot();
      root.clear();
      if (content) {
        root.append($createParagraphNode().append($createTextNode(content)));
      } else {
        root.append($createParagraphNode());
      }
    },
  }), [content]);

  const handleChange = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      setContent(root.getTextContent());
    });
  };

  const handleSave = () => {
    updateLegalMutation.mutate({ type: "terms", content });
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="space-y-4 text-[#333333] m-5 overflow-auto scrl-hide h-[calc(100vh-138px)]">
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className="text-xl font-medium text-gray-800">Terms and Conditions</h2>

          {isLoading ? (
            <Loading />
          ) : isError ? (
            <Error itemName="terms" />
          ) : (
            <LexicalComposer initialConfig={editorConfig}>
              <ToolbarPlugin />
              <RichTextPlugin
                contentEditable={<ContentEditable className="min-h-[300px] rounded-md outline-none" />}
                placeholder={<div className="editor-placeholder">Enter Terms and Conditions...</div>}
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <ListPlugin />
              <AutoFocusPlugin />
              <LexicalEditorInstancePlugin setEditorInstance={setEditorInstance} />
              <OnChangePlugin onChange={handleChange} />
            </LexicalComposer>
          )}
        </div>
        <div className="flex justify-center sticky bottom-0 bg-[#f8f8f8] py-4">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[#0ABAB5] text-white rounded-md hover:bg-[#099c99] transition cursor-pointer"
            disabled={updateLegalMutation.isLoading}
          >
            {updateLegalMutation.isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
