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

const initialText = `Welcome to Consult Me, your mobile platform for consulting. We connect businesses of all sizes with experienced consultants for affordable, tailored advice-without the overhead of traditional services.

Who We Are:
Our team of professionals offers expertise across business strategy, marketing, finance, technology, and more. Our mission is to provide accessible consulting to help your business grow and succeed. 

How It Works:
Download: Available on iOS and Android
Select: Browse consultants based on expertise
Book: Schedule your session
Get Results: Receive actionable advice and solutions

Why Choose Us?
Expert Consultants
Flexible and Accessible
Affordable Services
Confidential and Secure
Customer-Focused

Our Vision:
We aim to make expert consulting accessible, affordable, and efficient to empower businesses to thrive.
Contact us at [contact@consultme.com] or visit www.appname.com.
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

const About = () => {
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
                    <h2 className="text-xl font-medium text-gray-800">About Us</h2>
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

                <div className="flex justify-center  bg-[#f8f8f8]">
                    <button onClick={handleSave} className="px-6 py-2 bg-[#0ABAB5] text-white rounded-md hover:bg-[#099c99] transition cursor-pointer">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;
