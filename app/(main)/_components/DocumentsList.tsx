import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Item } from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import { IDocument } from "@/types/IDocument";

type Props = {
  parentDocumentId?: string;
  level?: number;
  data?: IDocument[];
};
export const DocumentsList = ({ parentDocumentId, level = 0 }: Props) => {
  const params = useParams();
  const router = useRouter();
  const [documents, setDocuments] = useState<IDocument[]>();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/documents/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch documents.");
        const data = await response.json();
        console.log(data);
        setDocuments(data);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };
    fetchData();
  }, []);

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
      <div className="p-1">
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <div className={"p-1"}>
              <Item.Skeleton level={level} />
            </div>
            <div className={"p-1"}>
              <Item.Skeleton level={level} />
            </div>
          </>
        )}
      </div>
    );
  }
  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages Inside
      </p>
      {documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.docuemntId === document._id}
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
