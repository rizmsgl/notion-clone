import { Document } from "@/types/document-types";

const updateDocument = async (updatedDocument: Document, documentId: string) =>{  
    try {
      const response = await fetch(`/api/documents/document/${documentId}`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: documentId, ...updatedDocument}  )
      })
      if (response.status === 200){
        console.log("Document content updated successfully.")
      }
    }catch(error){
      console.error("Error updating document content: ", error)
    }
    
}

export default updateDocument