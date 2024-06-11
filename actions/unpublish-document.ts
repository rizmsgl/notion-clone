import { Document } from "@/types/document-types";

const unPublishDocument = async(
    updatedDocument: Document,
    toast: any,
) =>{
    try {
        const response = await fetch(
          `/api/documents/document/${updatedDocument?._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: updatedDocument?._id, isPublished: false }),
          }
        );
        if (response.status === 200) {
          console.log("Document unpublished");
          toast({
            title: "Document unpublished",
            description: "Your document is now unpublished",
          });
        }
      } catch (error) {
        console.log("Error unpublishing document: ", error);
      } 
}

export default unPublishDocument