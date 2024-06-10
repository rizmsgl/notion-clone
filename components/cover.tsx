"use client";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { ImageIcon, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Document } from "@/types/document-types";
import { useDocsStore } from "@/store/documents-store";

type Props = {
  document: Document | undefined;
  preview?: boolean;
  className?: string;
};

export const Cover = ({ preview, document, className }: Props) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImage();
  const updateDocument = useDocsStore((state) => state.updateDocument);

  // remove cover image
  const removeCoverImage = async () => {
    const documentId = params.documentId;
    //@ts-ignore
    const updatedDocument: Document = {
      ...document,
      coverImage: "",
    };
    if (document?.coverImage !== "") {
      await edgestore.publicFiles.delete({
        url: document?.coverImage as string,
      });
    }
    try {
      const response = await fetch(
        `/api/documents/document/${documentId}/image`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(documentId),
        }
      );
      if (response.status === 200) {
        console.log("Cover image removed successfully.");
        updateDocument(updatedDocument);
      }
    } catch (error) {
      console.error("Error removing cover image: ", error);
    }
  };

  return (
    <div
      className={cn(
        "relative mt-[3.5rem] w-full h-[35vh] group",
        !document?.coverImage && "h-[12vh]",
        document?.coverImage && "bg-muted",
        className
      )}
    >
      {!!document?.coverImage && (
        <Image
          src={document?.coverImage}
          fill
          alt="Cover"
          className="object-cover"
        />
      )}
      {document?.coverImage && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => coverImage.onReplace(document?.coverImage as string)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <Button
            onClick={removeCoverImage}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
