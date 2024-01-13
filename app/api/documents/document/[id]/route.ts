import {NextApiResponse, NextApiRequest} from "next";
import {DocumentModel} from "@/models/DocumentModel";
import {connectToDB} from "@/utils/database";
import {auth} from "@clerk/nextjs";

export const GET = async (req: NextApiRequest, res:NextApiResponse) =>{
    try{
        const {userId} : {userId: string | null} = auth();
        if (userId === null){
            return res.status(401).json({error: 'Not Authenticated.'});
        }
        await connectToDB();
        const {id} = req.query;
        const document = await DocumentModel.findById(id);
        if (!document)
            return res.status(404).json({error: 'Not Found.'});
        if (document.userId !== userId)
            return res.status(403).json({error: 'Unauthorized.'});
        if (document.isPublished && !document.isArchived)
            return res.status(200).json(document);
        return res.status(200).json(document);
    }catch(error){
        console.error('Error fetching document by Id: ', error);
        return res.status(500).json({error: 'Internal Server Error.'});
    }
}

export const PATCH = async (req: NextApiRequest, res: NextApiResponse) =>{
    try{
        const {userId} :{userId: string | null} = auth();
        if (userId === null){
            return res.status(401).json({error: 'Not Authenticated.'});
        }
        await connectToDB();
        const {id, ...rest} = req.body;
        const existingDocument = await DocumentModel.findById(id);
        if (!existingDocument){
            return res.status(404).json({error: 'Not Found.'});
        }
        if (existingDocument.userId !== userId)
            return res.status(403).json({error: 'Unauthorized.'});
        // find the document by id and update it
        const updatedData = {
            ...rest,
            updatedAt: new Date()
        }
        const updatedDocument = await DocumentModel.findByIdAndUpdate(id, updatedData, {new: true});
        return res.status(200).json(updatedDocument);
    }catch (error){
        console.error('Error updating document: ', error);
        return res.status(500).json({error: 'Internal Server Error.'});
    }
}

export const DELETE = async (req: NextApiRequest, res:NextApiResponse) => {
    try{
        const {userId} : {userId: string | null} = auth();
        if (userId === null){
            return res.status(401).json({error: 'Not Authenticated.'});
        }
        await connectToDB();
        const {id} = req.query;
        const existingDocument = await DocumentModel.findById(id);
        if (!existingDocument)
            return res.status(404).json({error: 'Not Found.'});
        if (existingDocument.userId !== userId)
            return res.status(403).json({error: 'Unauthorized.'});
        await DocumentModel.findByIdAndDelete(id);
        return res.status(200).json({message: 'Document Deleted Successfully.'});
    }catch(error){
        console.error('Error deleting document: ', error);
        return res.status(500).json({error: 'Internal Server Error.'});
    }
}