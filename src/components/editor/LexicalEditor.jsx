// src/components/editor/LexicalEditor.jsx
"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeNode } from "@lexical/code";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import ToolbarPlugin from "./ToolbarPlugin";
import theme from "./theme";
import { useState } from "react";

const editorConfig = {
  namespace: "MyEditor",
  theme,
  onError(error) {
    throw error;
  },
  nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, CodeNode],
};

const LexicalEditor = () => {
  const [editorState, setEditorState] = useState();

  return (
    <div className="border rounded-lg p-4">
      <LexicalComposer initialConfig={editorConfig}>
        <ToolbarPlugin />
        <div className="min-h-[300px] p-3 border rounded-md mt-2">
          <RichTextPlugin
            contentEditable={<ContentEditable className="outline-none min-h-[250px]" />}
            placeholder={<div className="text-gray-400">Enter your text...</div>}
            ErrorBoundary={null}
          />
        </div>
        <HistoryPlugin />
        <AutoFocusPlugin />
        <ListPlugin />
        <LinkPlugin />
        <OnChangePlugin onChange={setEditorState} />
      </LexicalComposer>
    </div>
  );
};

export default LexicalEditor;
