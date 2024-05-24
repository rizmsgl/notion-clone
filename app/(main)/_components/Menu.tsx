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
import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Document } from "@/types/document-types";

type Props = {
  initialData: Document | undefined;
};

export const Menu = ({ initialData }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const updateDocument = useDocsStore((state) => state.updateDocument);
  // archive
  const onArchive = async () => {
    try {
      const response = await fetch(
        `/api/documents/document/${initialData?._id}/archive`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(initialData?._id),
        }
      );
      if (response.status === 200) {
        toast({
          title: "Moving Note...",
          description: "Note moved successfully to trash.",
        });
        const updatedDocument: Document = {
          ...initialData,
          isArchived: true,
        };
        updateDocument(updatedDocument);

        router.push("/documents");
      }
    } catch (error) {
      console.error("Error moving document to trash: ", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to move note to trash.",
      });
    }
  };

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
