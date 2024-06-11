
const archiveDocument = async (
    documentId: string,
    router: any,
    toast: any,
) =>{
    try {
        const response = await fetch(`/api/documents/document/${documentId}/archive`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(documentId),
        });
        if (response.status === 200) {
          toast({
            title: "Moving Note...",
            description: "Note moved successfully to trash.",
          });
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
}

export default archiveDocument;