"use client";
import React, { useCallback, useEffect } from "react";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { debounce } from "lodash";
type Props = {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

const Editor = ({ onChange, initialContent, editable }: Props) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();
  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  // delay the onChange function

  const delayOnChange = useCallback(
    debounce(() => {
      onChange(JSON.stringify(editor.document));
    }, 5000), // delay 5s
    [editor, onChange]
  );

  const onEditorContentChange = useCallback(() => {
    delayOnChange();
  }, [delayOnChange]);

  // Auto-save every 10 seconds

  useEffect(() => {
    const interval = setInterval(onEditorContentChange, 10000);
    return () => clearInterval(interval);
  }, [onEditorContentChange]);

  return (
    <div>
      <BlockNoteView
        editable={editable}
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={onEditorContentChange}
      />
    </div>
  );
};

export default Editor;
