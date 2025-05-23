"use client";
import { useQuery } from "@tanstack/react-query";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "@/components/editor/ToolbarPlugin";
import { useState, useMemo } from "react";
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { getLegal } from "@/lib/queries/getLegal";
import Loading from "@/components/loading/Loading";
import Error from "@/components/error/Error";

const Terms = () => {
  const [content, setContent] = useState("");

  const { data: legal = [""], isLoading, isError } = useQuery({
    queryKey: ["legal"],
    queryFn: getLegal,
  });

  const legalText = legal[0] || "";

  const editorConfig = useMemo(() => ({
    theme: {
      paragraph: "editor-paragraph",
    },
    onError(error) {
      throw error;
    },
    nodes: [ListNode, ListItemNode, HeadingNode, QuoteNode],
    editorState: () => {
      const root = $getRoot();
      const paragraph = $createParagraphNode();
      paragraph.append($createTextNode(legalText));
      root.append(paragraph);
    },
  }), [legalText]);

  const handleChange = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      setContent(root.getTextContent());
    });
  };

  const handleSave = () => {
    console.log("Saved content:", content);
  };

  // if (isLoading) return <Loading />;
  // if (isError) return <Error itemName="terms" />;

  return (
    <div className="space-y-4 text-[#333333] m-5 overflow-auto scrl-hide h-[calc(100vh-138px)]">
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className="text-xl font-medium text-gray-800">Terms and Conditions</h2>

          <LexicalComposer initialConfig={editorConfig}>

            <ToolbarPlugin />

            <RichTextPlugin
              contentEditable={<ContentEditable className="min-h-[300px rounded-md outline-none" />}
              placeholder=""
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <ListPlugin />
            <AutoFocusPlugin />
            <OnChangePlugin onChange={handleChange} />
          </LexicalComposer>

        </div>
        {
          isLoading ? (<Loading />) : isError ? (<Error />) : null
        }
        <div className="flex justify-center sticky bottom-0 bg-[#f8f8f8]">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[#0ABAB5] text-white rounded-md hover:bg-[#099c99] transition cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
