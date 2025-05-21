"use client";

import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
} from "lexical";
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
} from "@lexical/list";
import { $patchStyleText, $getSelectionStyleValueForProperty } from "@lexical/selection";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";

// Import react-icons
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl, FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [fontSize, setFontSize] = useState("16px");

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));

      const currentFontSize = $getSelectionStyleValueForProperty(
        selection,
        "font-size",
        "16px"
      );
      setFontSize(currentFontSize);
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  const applyFontSize = (size) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, {
          "font-size": size,
        });
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-2 p-2 rounded-md mb-4 sticky top-0 bg-[#f8f8f8]">
      {/* Font Size Selector */}
      <div className="border-2 border-gray-300 bg-white p-1 rounded text-sm font-semibold">
        <select
          value={fontSize}
          onChange={(e) => applyFontSize(e.target.value)}
          className="outline-none"
        >
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="30px">30px</option>
        </select>
      </div>

      <div className="border-2 border-gray-300 rounded text-sm flex">
        {/* Bold */}
        <button
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
          className={`p-2 rounded ${isBold ? "bg-teal-500 text-white" : "bg-white text-black"}`}
        >
          <FaBold />
        </button>

        <div className="border border-gray-300"></div>

        {/* Italic */}
        <button
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
          className={`p-2 rounded ${isItalic ? "bg-teal-500 text-white" : "bg-white text-black"}`}
        >
          <FaItalic />
        </button>

        <div className="border border-gray-300"></div>

        {/* Underline */}
        <button
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
          className={`p-2 rounded ${isUnderline ? "bg-teal-500 text-white" : "bg-white text-black"}`}
        >
          <FaUnderline />
        </button>
      </div>

      <div className="border-2 border-gray-300 rounded text-sm flex">
        {/* Strikethrough */}
        <button
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}
          className={`p-2 rounded ${isStrikethrough ? "bg-teal-500 text-white" : "bg-white text-black"}`}
        >
          <FaStrikethrough />
        </button>
        <div className="border border-gray-300"></div>
        {/* Bullet List */}
        <button
          onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)}
          className="p-2 rounded bg-white text-black"
        >
          <FaListUl />
        </button>
        <div className="border border-gray-300"></div>
        {/* Numbered List */}
        <button
          onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND)}
          className="p-2 rounded bg-white text-black"
        >
          <FaListOl />
        </button>
      </div>

      <div className="border-2 border-gray-300 rounded text-sm flex">
        {/* Align Left */}
        <button
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
          className="p-2 rounded bg-white text-black"
        >
          <FaAlignLeft />
        </button>

        <div className="border border-gray-300"></div>
        {/* Align Center */}
        <button
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
          className="p-2 rounded bg-white text-black"
        >
          <FaAlignCenter />
        </button>

        <div className="border border-gray-300"></div>

        {/* Align Right */}
        <button
          onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
          className="p-2 rounded bg-white text-black"
        >
          <FaAlignRight />
        </button>
      </div>
    </div>
  );
}
