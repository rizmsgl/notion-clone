import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Document } from "@/types/document-types";
import React, { useRef, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  initialData: Document;
};

export const Title = ({ initialData }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string>(initialData.title || "Untitled");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTitle(initialData.title || "Untitled");
  }, [initialData.title, setTitle]);

  const enableInput = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };
  const disableInput = () => {
    setIsEditing(false);
  };
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const data = {
      id: initialData._id,
      title: title || "Untitled",
    };
    try {
      await fetch(`/api/documents/document/${initialData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error updating document title: ", error);
    }
    if (event.key === "Enter") {
      disableInput();
    }
  };
  return (
    <div className="flex items-center gap-x-1">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className="font-normal h-auto p-1"
        >
          <span className="truncate font-bold text-xl font-crimson">
            {title}
          </span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-20 rounded-md" />;
};
