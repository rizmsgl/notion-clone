import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  documentId: string;
};

const Banner = ({ documentId }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  // remove and restore
  const onRemove = async () => {
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
        router.push("/documents");
      }
    } catch (error) {
      console.error("Failed to delete note: ", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to delete note.",
      });
    }
  };
  const onRestore = async () => {
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
      if (response.status === 200) {
        toast({
          title: "Restoring note...",
          description: "Note restored successfully.",
        });
      }
    } catch (error) {
      console.error("Failed to restore note: ", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to restore note.",
      });
    }
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This note is in the Trash.</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white p-1 px-2 h-auto font-normal"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
