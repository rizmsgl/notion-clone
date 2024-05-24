import { Document, DocumentState } from "@/types/document-types";
import { create } from "zustand";

export const useDocsStore = create<DocumentState>((set) => ({
  documents: undefined as Document[] | undefined,
  archivedDocuments: undefined as Document[] | undefined,
  setDocuments: (documents: Document[]) => set({ documents }),
  updateDocument: (updatedDocument: Document) =>
    set((state) => {
      // Update the document
      const updatedDocuments = (state.documents || []).map((doc: Document) =>
        doc._id === updatedDocument._id ? updatedDocument : doc
      );

      return { documents: updatedDocuments };
    }),
  fetchDocuments: async (parentDocumentId?: string) => {
    const url = parentDocumentId
      ? `/api/documents?parentDocument=${encodeURIComponent(parentDocumentId)}`
      : "/api/documents";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch documents.");
      }

      const newDocuments: Document[] = await response.json();
      set((state) => {
        const existingDocuments = state.documents || [];
        const updatedDocuments = [...existingDocuments];
        newDocuments.forEach((newDoc) => {
          const index = existingDocuments.findIndex(
            (doc) => doc._id === newDoc._id
          );
          if (index === -1) {
            updatedDocuments.push(newDoc);
          }
        });
        return { documents: updatedDocuments };
      });
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  },
  updateDocumentById: (docId: string, updatedFields: Partial<Document>) =>
    set((state) => {
      const updatedDocuments = (state.documents || []).map((doc: Document) => {
        return doc._id === docId ? { ...doc, ...updatedFields } : doc;
      });
      return { documents: updatedDocuments };
    }),
  fetchArchivedDocuments: async () => {
    const url = "/api/documents/trash/";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const documents = await response.json();
      set((state) => {
        return { archivedDocuments: documents };
      });
    } catch (error) {
      console.error("Error fetching trash documents: ", error);
    }
  },
  deleteDocumentById: (docId: string) =>
    set((state) => {
      const updatedDocuments = (state.documents || []).filter(
        (doc: Document) => doc._id !== docId
      );
      return { documents: updatedDocuments };
    }),
}));
