import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useDocsStore } from "@/store/documents-store";
import { useUser } from "@clerk/nextjs";
import { MoreHorizontal, Save, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Document } from "@/types/document-types";
import archiveDocument from "@/actions/archive-document";
import updateDocument from "@/actions/update-document";

type Props = {
  initialData: Document | undefined;
};

export const Menu = ({ initialData }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const updateDocumentById= useDocsStore((state) => state.updateDocumentById);
  const updateDocumentState = useDocsStore((state) => state.updateDocument);
  const documents = useDocsStore((state) => state.documents);
  // archive
  const onArchive = async () => {
    await archiveDocument(initialData?._id as string, router, toast);
    updateDocumentById(initialData?._id as string, { isArchived: true })
  };

  const onSaveChanges = async () => {
    const document = documents?.filter((document) => 
      document._id === initialData?._id)
    if (document === undefined) {
      throw new TypeError('No Document was found with the given ID.');
    }
    await updateDocument(document[0], initialData?._id as string);
    updateDocumentState(document[0])
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSaveChanges}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};
