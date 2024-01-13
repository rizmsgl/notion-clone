import {NextApiRequest, NextApiResponse} from "next";
import {DocumentModel} from "@/models/DocumentModel";
import {connectToDB} from "@/utils/database";
import {auth} from "@clerk/nextjs";

export default async function handler (req: NextApiRequest, res: NextApiResponse){
    if (req.method !== 'PATCH')
        return res.status(405).end(); // Method Not Allowed
    try{
        const {userId} : {userId: string | null} = auth();
        if (userId === null)
            return res.status(401).json({error: 'Not Authenticated.'});
        await connectToDB();
        const {id} = req.query;
        const existingDocument = await DocumentModel.findById(id);
        if (!existingDocument)
            return res.status(404).json({error: 'Not Found.'});
        if (existingDocument.userId !== userId)
            return res.status(403).json({error: 'Unauthorized'});
        await DocumentModel.findByIdAndUpdate(id, {coverImage: undefined});
        return res.status(200).json({message: 'Cover Image Removed Successfully.'});
    }catch(error){
        console.error('Error removing cover image: ', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}