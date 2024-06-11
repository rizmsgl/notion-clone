import { Document } from "@/types/document-types";

const publishDocument = async (
    updatedDocument: Document,
    toast: any,
) => {
    try {
      const response = await fetch(
        `/api/documents/document/${updatedDocument?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: updatedDocument._id, isPublished: true }),
        }
      );
      if (response.status === 200) {
        console.log("Document published");
        toast({
          title: "Document published",
          description: "Your document is now live",
        });
      }
    } catch (error) {
      console.error("Error publishing document: ", error);
    } 
}

export default publishDocument;