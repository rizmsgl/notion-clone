"use client";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { SingleImageDropzone } from "../image-dropzone";
import { useDocsStore } from "@/store/documents-store";
import { Document } from "@/types/document-types";

type Props = {};

const CoverImageModal = (props: Props) => {
  const params = useParams();
  const { edgestore } = useEdgeStore();
  const coverImage = useCoverImage();
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const documents = useDocsStore((state) => state.documents);
  const [document, setDocument] = useState<Document | undefined>(undefined);
  const updateDocument = useDocsStore((state) => state.updateDocument);

  useEffect(() => {
    const documentId = params?.documentId;
    const document = documents?.find((doc) => doc._id === documentId);
    setDocument(document);
  }, [params, documents]);

  const update = async (imageUrl: string) => {
    const documentId = params.documentId;
    //@ts-ignore
    const updatedDocument: Document = {
      ...document,
      coverImage: imageUrl,
    };
    try {
      const response = await fetch(`/api/documents/document/${documentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: documentId, coverImage: imageUrl }),
      });
      if (response.status === 200) {
        updateDocument(updatedDocument);
        console.log("Cover image updated successfully.");
      }
    } catch (error) {
      console.error("Error updating cover image: ", error);
    }
  };

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const response = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url,
        },
      });
      console.log("URL: ", response.url);
      await update(response.url);
      onClose();
    }
  };
  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
