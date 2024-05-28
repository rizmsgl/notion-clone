"use client";
import { Cover } from "@/components/cover";
import Toolbar from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { Document } from "@/types/document-types";
import dynamic from "next/dynamic";
import React, { useMemo, useState, useEffect } from "react";

type Props = {
  params: {
    documentId: string;
  };
};

const DocumentIdPage = ({ params }: Props) => {
  const [document, setDocument] = useState<Document>();
  useEffect(() => {
    const documentId = params?.documentId;
    const getDocumentById = async () => {
      try {
        const response = await fetch(
          `/api/documents/document/${documentId}?documentId=${documentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const document = await response.json();
        setDocument(document);
      } catch (error) {
        console.error("Error fetching editor document: ", error);
      }
    };
    getDocumentById();
  }, [params]);
  console.log(document);
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );
  const onChange = () => {};
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
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor initialContent={document.content} onChange={onChange} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
