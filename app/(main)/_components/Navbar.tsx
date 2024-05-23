import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Document } from "@/types/document-types";
import { MenuIcon } from "lucide-react";
import { Title } from "./Title";
import { Menu } from "./Menu";
import Banner from "./Banner";
import Publish from "./Publish";

type Props = {
  isCollapsed: boolean;
  onResetWidth: () => void;
};

const Navbar = ({ isCollapsed, onResetWidth }: Props) => {
  const params = useParams();
  const [document, setDocument] = useState<Document | undefined | null>(
    undefined
  );
  useEffect(() => {
    const getDocument = async () => {
      const response = await fetch(
        `/api/documents/document/${params.documentId}?documentId=${params.documentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const document = await response.json();
      setDocument(document);
    };
    getDocument();
  }, [params.documentId]);
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
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};

export default Navbar;
