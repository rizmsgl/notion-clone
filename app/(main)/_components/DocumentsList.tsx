import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Item } from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import { Document } from "@/types/document-types";

type Props = {
  parentDocumentId?: string;
  level?: number;
  data?: Document[];
};
export const DocumentsList = ({ parentDocumentId, level = 0 }: Props) => {
  const params = useParams();
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const fetchData = async (parentDocId?: string) => {
    const url = parentDocId
      ? `/api/documents?parentDocument=${encodeURIComponent(parentDocId)}`
      : "/api/documents";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch documents.");
      }

      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    fetchData(parentDocumentId);
  }, [parentDocumentId]);

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : "12px",
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => onExpand(document._id)}
            expanded={expanded[document._id]}
          />
          {expanded[document._id] && (
            <DocumentsList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};
