import deleteDocument from "@/actions/delete-document";
import restoreDocument from "@/actions/restore-document";
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
    await deleteDocument(
      documentId,
      router,
      toast
    )
  };
  const onRestore = async () => {
    await restoreDocument(
      documentId,
      router,
    )
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
