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
