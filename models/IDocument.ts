import {Document} from 'mongoose';

interface IDocument extends Document{
    title: string,
    userId: string,
    isArchived: boolean,
    parentDocument?: string,
    content?: string,
    coverImage?: string,
    icon?: string,
    isPublished: boolean,
    createdAt: Date,
    updatedAt: Date,
}
export type {IDocument};