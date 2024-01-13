import {NextApiRequest, NextApiResponse} from 'next';
import {DocumentModel} from "@/models/DocumentModel";
import {connectToDB} from "@/utils/database";
import {auth} from "@clerk/nextjs";


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if (req.method !== 'PUT'){
        return res.status(405).end();
    }
    try{
        const {userId}: {userId: string | null} = auth();
        if (userId === null){
            return res.status(401).json({error: 'Not Authenticated.'});
        }
        await connectToDB();
        const {id} = req.query;
        const existingDocument = await DocumentModel.findById(id);
        if (!existingDocument){
            return res.status(404).json({error: 'Not Found.'});
        }
        if (existingDocument.userId !== userId)
            return res.status(403).json({error: 'Unauthorized'});
        await DocumentModel.findByIdAndUpdate(id, {isArchived: true});

        // Recursive archive function to handle children documents
        const recursiveArchive = async (documentId: string | string[] | undefined) => {
            const children = await DocumentModel.find({userId, parentDocument: documentId});
            for (const child of children){
                await DocumentModel.findByIdAndUpdate(child._id,{isArchived: true});
                await recursiveArchive(child._id);
            }
        }
        await recursiveArchive(id);
        return res.status(200).json({message: 'Document Archived Successfully.'});

    }catch(error){
        console.error('Error archiving document:', error);
        return res.status(500).json({error: 'Internal Server Error.'});
    }
}