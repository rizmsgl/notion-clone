import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import useOrigin from "@/hooks/use-origin";
import { fireConfetti } from "@/lib/confetti";
import { useDocsStore } from "@/store/documents-store";
import { Document } from "@/types/document-types";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Check, Copy, Globe } from "lucide-react";
import React, { useState } from "react";

type Props = {
  initialData: Document;
};

const Publish = ({ initialData }: Props) => {
  const origin = useOrigin();
  const { toast } = useToast();
  const updateDocument = useDocsStore((state) => state.updateDocument);
  const [copied, setCopied] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = async () => {
    setIsUpdating(true);
    fireConfetti();
    const updatedDocument = { ...initialData, isPublished: true };
    try {
      const response = await fetch(
        `/api/documents/document/${initialData?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: initialData._id, isPublished: true }),
        }
      );
      if (response.status === 200) {
        updateDocument(updatedDocument);
        console.log("Document published");
        toast({
          title: "Document published",
          description: "Your document is now live",
        });
      }
    } catch (error) {
      console.error("Error publishing document: ", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const onUnPublish = async () => {
    setIsUpdating(true);
    const updatedDocument = { ...initialData, isPublished: false };
    try {
      const response = await fetch(
        `/api/documents/document/${initialData?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: initialData?._id, isPublished: false }),
        }
      );
      if (response.status === 200) {
        updateDocument(updatedDocument);
        console.log("Document unpublished");
        toast({
          title: "Document unpublished",
          description: "Your document is now unpublished",
        });
      }
    } catch (error) {
      console.log("Error unpublishing document: ", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {initialData.isPublished ? (
          <Button variant="ghost" size="sm">
            Published
            <Globe className="text-gray-500 h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button variant="ghost" size="sm">
            Publish
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="text-gray-500 animate-pulse h-4 w-4" />
              <p className="text-xs font-medium text-gray-500">
                This note is live on the web.
              </p>
            </div>
            <div className="flex items-center">
              <Input
                className="flex-1 px-2 text-xs border rounded-l-md rounded-r-none h-8 bg-muted truncate"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="h-[0.5px] w-full my-2 bg-muted-foreground rounded-xl" />
            <Button
              size="sm"
              className="w-full text-xs"
              disabled={isUpdating}
              onClick={onUnPublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex items-start flex-col justify-center">
            <div className="flex flex-row items-center justify-center">
              <Globe className="h-4 w-4 text-muted-foreground mr-2" />
              <p className="text-sm font-medium">Publish this note</p>
            </div>
            <span className="text-xs text-muted-foreground mb-4">
              Share your work with others.
            </span>
            <Button
              disabled={isUpdating}
              onClick={onPublish}
              className="w-full text-sm"
              size="sm"
            >
              Publish Now
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
