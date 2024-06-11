
const restoreDocument = async (
    documentId: string,
    toast: any,
) => {
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
}

export default restoreDocument