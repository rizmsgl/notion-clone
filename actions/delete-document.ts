
const deleteDocument = async (
    documentId: string,
    router: any,
    toast: any
) =>{
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
}
export default deleteDocument;