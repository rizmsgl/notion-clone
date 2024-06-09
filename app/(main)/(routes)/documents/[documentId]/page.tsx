"use client";
import { Cover } from "@/components/cover";
import Toolbar from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocsStore } from "@/store/documents-store";
import { Document } from "@/types/document-types";
import dynamic from "next/dynamic";
import React, { useMemo, useEffect, useState } from "react";

type Props = {
  params: {
    documentId: string;
  };
};

const DocumentIdPage = ({ params }: Props) => {
  const documents = useDocsStore((state) => state.documents);
  const [document, setDocument] = useState<Document | undefined>(undefined);
  const updateDocument = useDocsStore((state) => state.updateDocument);
  useEffect(() => {
    const documentId = params?.documentId;
    const document = documents?.find((doc) => doc._id === documentId);
    setDocument(document);
  }, [params, documents]);
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );
  const onChange = async (content: string) => {
    //@ts-ignore
    const updatedDocument: Document = { ...document, content: content };
    try {
      const response = await fetch(`/api/documents/document/${document?._id}`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: document?._id, content})
      })
      if (response.status === 200){
        updateDocument(updatedDocument)
        console.log("Document content updated successfully.")
      }
    }catch(error){
      console.error("Error updating document content: ", error)
    }
    
  };
  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }
  if (document == null) {
    return <div>Not found.</div>;
  }
  return (
    <div className="pb-40">
      <Cover document={document} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor initialContent={document} onChange={onChange}/>
      </div>
    </div>
  );
};

export default DocumentIdPage;
