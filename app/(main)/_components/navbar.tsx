import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import { Title } from "./title";
import { Menu } from "./menu";
import Banner from "./banner";
import Publish from "./publish";
import { useDocsStore } from "@/store/documents-store";
import { Document } from "@/types/document-types";

type Props = {
  isCollapsed: boolean;
  onResetWidth: () => void;
};

const Navbar = ({ isCollapsed, onResetWidth }: Props) => {
  const params = useParams();
  const documents = useDocsStore((state) => state.documents);
  const [document, setDocument] = useState<Document | undefined>(undefined);
  useEffect(() => {
    const documentId = params?.documentId;
    const document = documents?.find((doc) => doc._id === documentId);
    setDocument(document);
  }, [params, documents]);
  if (document == null) return null;
  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
            <Publish initialData={document} />
            <Menu initialData={document} />
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};

export default Navbar;
