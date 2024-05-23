import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Document } from "@/types/document-types";
import { useToast } from "@/components/ui/use-toast";
import { Spinner } from "@/components/Spinner";
import { Search, Trash, Undo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";

type Props = {};

const TrashBox = (props: Props) => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [documents, setDocuments] = useState<Document | undefined>(undefined);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const getDocuments = async () => {
      try {
        const response = await fetch("/api/documents/trash/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const documents = await response.json();
        setDocuments(documents);
      } catch (error) {
        console.error("Error fetching trash documents: ", error);
      }
    };
    getDocuments();
  }, []);
  //@ts-ignore
  const filteredDocuments = documents?.filter((document: Document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });
  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };
  const onRestore = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: string
  ) => {
    event.stopPropagation();
    try {
      const response = await fetch(
        `/api/documents/document/${documentId}/restore`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(documentId),
        }
      );
      if (response.status === 200)
        toast({
          title: "Restoring note...",
          description: "Note restored successfully.",
        });
    } catch (error) {
      console.error("error restoring document: ", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Error restoring note.",
      });
    }
  };

  const onRemove = async (documentId: string) => {
    try {
      const response = await fetch(`/api/documents/document/${documentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(documentId),
      });
      if (response.status === 200) {
        toast({
          title: "Deleting note...",
          description: "Note deleted successfully.",
        });
        if (params.documentId === documentId) {
          router.push("/documents");
        }
      }
    } catch (error) {
      console.error("error deleting document: ", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Error deleting note.",
      });
    }
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found.
        </p>
        {filteredDocuments?.map((document: Document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, document._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
