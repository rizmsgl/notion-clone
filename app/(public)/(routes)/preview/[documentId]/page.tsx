"use client"
import { Cover } from "@/components/cover";
import Toolbar from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useDocsStore } from "@/store/documents-store";
import { Document } from "@/types/document-types";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  params:{
    documentId: string;
  }
};

const DocumentIdPage = ({ params }: Props) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );
  const [document, setDocument] = useState<Document | undefined>(undefined);

  const getDocument = async () =>{
    try{
      const response = await fetch(`/api/documents/document/$[params.documentId}?documentId=${params.documentId}`,
        {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.status === 200){
        const data = await response.json()
        setDocument(data)
      }
    }catch(error){
      console.error("Error fetching document: ", error)
    }
  }
  useEffect(() =>{
    getDocument()
  
  },[params])
  const onChange = async (content: string) => {
    try {
      const response = await fetch(`/api/documents/document/${document?._id}`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: document?._id, content})
      })
      if (response.status === 200){
        console.log("Document content updated successfully.")
      }
    }catch(error){
      console.error("Error updating document content: ", error)
    }
  }
  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="space-y-4 pl-8 pt-4">
          <Skeleton className="h-14 w-[50%]" />
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-4 w-[40%]" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </div>
    );
  }
  
  if(document === null){
    return <div>Not Found</div>
  }

  return (
    <div className="pb-40">
        <Cover preview document={document} className="mt-0"/>
        <div className="md:max-w-3xl lg:max-w-4wxl mx-auto">
          <Toolbar preview initialData={document}/>
          <Editor initialContent={document} editable={false} onChange={onChange}/>
        </div>
    </div>
  );
};

export default DocumentIdPage;
