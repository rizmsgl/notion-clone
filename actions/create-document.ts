import { Document } from "@/types/document-types";

const createDocument = async (
    documentData: any,
    router: any,
    toast: any,
) => {
    try {
        const response = await fetch("/api/documents/document", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(documentData),
        });
        if (!response.ok) throw new Error("Failed to create a new note.");
        const document = await response.json();
        const documentId = document._id;
        router.push(`/documents/${documentId}`);
        toast({
          title: "New note.",
          description: "Note created successfully.",
        });
      } catch (error) {
        console.error("Error creating document: ", error);
        toast({
          variant: "destructive",
          title: "Oops ! something went wrong.",
          description: "Failed to create new note.",
        });
      }
}

export default createDocument;