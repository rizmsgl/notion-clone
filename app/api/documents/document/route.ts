import {NextApiResponse, NextApiRequest} from "next";
import {DocumentModel} from "@/models/DocumentModel";
import {connectToDB} from "@/utils/database";
import {auth} from "@clerk/nextjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== 'POST'){
        return res.status(405).end(); // Method Not Allowed
    }
    try{
        const {userId} : {userId: string | null} = auth();
        if (userId === null){
            return res.status(401).json({error: 'Not Authenticated.'});
        }
        await connectToDB();
        const {title, parentDocument} = req.body;
        // Create a new document
        const document = new DocumentModel({
            title,
            parentDocument,
            userId,
            isArchived: false,
            isPublished: false,
        });
        await document.save();
        return res.status(201).json(document);
    }catch(error){
        console.error('Error creating document: ', error);
        return res.status(500).json({error: 'Internal Server Error.'});
    }
}