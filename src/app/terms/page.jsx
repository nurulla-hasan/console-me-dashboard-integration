"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "@/components/editor/ToolbarPlugin";
import { useState } from "react";
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

const initialText = `Welcome to Consult Me. By using the App, you agree to comply with these Terms and Conditions. If you do not agree, do not use the App.

1. Acceptance of Terms
By using the App, you agree to these Terms and any updates that may occur. Please review them regularly.

2. User Registration
You must register an account to use certain features. You are responsible for maintaining the security of your login credentials and all activities under your account.

3. Consulting Services
The App connects clients with independent consultants. The App does not offer consulting services directly; the terms, fees, and schedules for consultations are between the client and consultant.

4. Fees and Payments
Clients will pay consultants according to their set rates. Payments are processed through the App’s payment system. Refunds and cancellations are subject to the consultant’s policy.

5. User Conduct
You agree not to:
• Violate laws or third-party rights.
• Impersonate others.
• Distribute harmful or offensive content.

6. Intellectual Property
Content in the App, including logos and software, is owned by [App Name] and cannot be used without permission.
`;

const editorConfig = {
  theme: {
    paragraph: "editor-paragraph",
  },
  onError(error) {
    throw error;
  },
  nodes: [
    ListNode,
    ListItemNode,
    HeadingNode,
    QuoteNode,
  ],
  editorState: () => {
    const root = $getRoot();
    const paragraph = $createParagraphNode();
    paragraph.append($createTextNode(initialText));
    root.append(paragraph);
  },
};

const Terms = () => {
  const [content, setContent] = useState(initialText);

  const handleChange = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      setContent(root.getTextContent());
    });
  };

  const handleSave = () => {
    console.log("Saved content:", content);
  };

  return (
    <div className="space-y-4 text-[#333333] m-5 overflow-auto scrl-hide">
      <div className="flex flex-col justify-between gap-6 h-[85vh]">
        <div>
          <h2 className="text-xl font-medium text-gray-800">Terms and Conditions</h2>
          <LexicalComposer initialConfig={editorConfig}>
            <ToolbarPlugin />
            <RichTextPlugin
              contentEditable={<ContentEditable className="min-h-[300px] rounded-md outline-none" />}
              placeholder=""
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <ListPlugin />
            <AutoFocusPlugin />
            <OnChangePlugin onChange={handleChange} />
          </LexicalComposer>
        </div>

        <div className="flex justify-center sticky bottom-0 bg-[#f8f8f8]">
          <button onClick={handleSave} className="px-6 py-2 bg-[#0ABAB5] text-white rounded-md hover:bg-[#099c99] transition cursor-pointer">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
