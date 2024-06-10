import { useToast } from "@/components/ui/use-toast";
import useOrigin from "@/hooks/use-origin";
import { useDocsStore } from "@/store/documents-store";
import { Document } from "@/types/document-types";
import React, { useState } from "react";

type Props = {
  initialData: Document;
};

const Publish = ({ initialData }: Props) => {
  const origin = useOrigin();
  const { toast } = useToast();
  const updateDocument = useDocsStore((state) => state.updateDocument);
  const [copied, setCopied] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = async () => {
    setIsUpdating(true);
    const updatedDocument = { ...initialData, isPublished: true };
    try {
      const response = await fetch(
        `/api/documents/document/${initialData?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: initialData._id, isPublished: true }),
        }
      );
      if (response.status === 200) {
        updateDocument(updatedDocument);
        console.log("Document published");
        toast({
          title: "Document published",
          description: "Your document is now live",
        });
      }
    } catch (error) {
      console.error("Error publishing document: ", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const onUnPublish = async () => {
    setIsUpdating(true)
    const updatedDocument = { ...initialData, isPublished: false };
    try{
      const response = await fetch(`/api/documents/document/${initialData?._id}`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: initialData?._id, isPublished: false})
      })
      if (response.status === 200){
        updateDocument(updatedDocument)
        console.log('Document unpublished')
        toast({
          title: 'Document unpublished',
          description: 'Your document is now unpublished'
        })
      } 
    }catch(error){
      console.log('Error unpublishing document: ', error)
    }finally{
      setIsUpdating(false)
    }
  }

  return <div>Publish</div>;
};

export default Publish;
