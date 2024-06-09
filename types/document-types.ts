export type Document = {
  _id: string;
  title: string;
  userId: string;
  isArchived: boolean;
  parentDocument?: string;
  content?: string;
  coverImage?: string;
  icon?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type DocumentState = {
  documents: Document[] | undefined;
  archivedDocuments: Document[] | undefined;
  setDocuments: (documents: Document[]) => void;
  updateDocument: (updatedDocument: Document) => void;
  fetchDocuments: (parentDocumentId?: string) => Promise<void>;
  updateDocumentById: (docId: string, updatedFields: Partial<Document>) => void;
  fetchArchivedDocuments: () => Promise<void>;
  deleteDocumentById: (docId: string) => void;
};
