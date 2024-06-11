import { Document } from "@/types/document-types";


const removeCoverImage = async (
    documentId: string,
) =>{
    try {
        const response = await fetch(
          `/api/documents/document/${documentId}/image`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(documentId),
          }
        );
        if (response.status === 200) {
          console.log("Cover image removed successfully.");
        }
      } catch (error) {
        console.error("Error removing cover image: ", error);
      }
}

export default removeCoverImage;