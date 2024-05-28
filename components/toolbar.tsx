"use client";
import { useCoverImage } from "@/hooks/use-cover-image";
import { Document } from "@/types/document-types";
import React, { ElementRef, useRef, useState, useEffect } from "react";
import { useDocsStore } from "@/store/documents-store";
import { Button } from "./ui/button";
import { ImageIcon } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  initialData: Document;
  preview?: boolean;
};

const Toolbar = ({ initialData, preview }: Props) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);
  const coverImage = useCoverImage();
  const updateDocument = useDocsStore((state) => state.updateDocument);

  useEffect(() => {
    setValue(initialData.title || "Untitled");
  }, [initialData.title, setValue]);

  // enable input
  const enableInput = () => {
    if (preview) return;
    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef?.current?.focus();
    });
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  const onKeyDown = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      const updatedDocument: Document = {
        ...initialData,
        title: value || "Untitled",
      };
      event.preventDefault();
      try {
        const response = await fetch(
          `/api/documents/document/${initialData._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: initialData._id, title: value }),
          }
        );
        if (response.status === 200) {
          updateDocument(updatedDocument);
          console.log("Document title updated successfully.");
        }
      } catch (error) {
        console.error("Error updating document title: ", error);
      }
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    // update icon
  };
  const onRemoveIcon = () => {
    // remove icon
  };
  // remove icon

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          {/** Icon Picker Here */}
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && <Button>Add icon</Button>}
        {!initialData.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-noe text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
        >
          {initialData.title || "Untitled"}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
