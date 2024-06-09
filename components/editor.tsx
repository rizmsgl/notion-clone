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
import { useDocsStore } from "@/store/documents-store";
import { Document } from "@/types/document-types";
type Props = {
  onChange: (value: string) => void;
  initialContent?: Document;
  editable?: boolean;
};

const Editor = ({ onChange, initialContent, editable }: Props) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();
  const updateDocument = useDocsStore((state) => state.updateDocument);
  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent?.content
      ? (JSON.parse(initialContent?.content) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  // delay the onChange function

  const delayOnChange = useCallback(
    debounce(() => {
      onChange(JSON.stringify(editor.document));
    }, 15000), // delay 15s
    [editor, onChange]
  );

  const onEditorContentChange = useCallback(() => {
    //@ts-ignore
    const updatedDocument: Document = {
      ...initialContent,
      content: JSON.stringify(editor.document),
    };
    console.log(updatedDocument)
    updateDocument(updatedDocument);
    delayOnChange();
  }, [delayOnChange, editor.document, updateDocument, initialContent]);

  // Auto-save every 15 seconds

  useEffect(() => {
    const interval = setInterval(onEditorContentChange, 15000);
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
