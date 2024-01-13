import {NextApiRequest, NextApiResponse} from "next";
import {DocumentModel} from "@/models/DocumentModel";
import {connectToDB} from "@/utils/database";
import {auth} from "@clerk/nextjs";

export default async function handler(req: NextApiRequest, res:NextApiResponse){
    if (req.method !== "GET"){
        return res.status(405).end(); // Method not allowed
    }
    try{
        const {userId} : {userId: string | null} = auth();
        if (userId === null){
            return res.status(401).json({error: 'Not Authenticated.'});
        }
        await connectToDB();
        const documents = await DocumentModel.find({
            userId,
            isArchived: false,
        }).sort({updatedAt: -1});
        return res.status(200).json(documents);
    }catch(error){
        console.error("Error fetching search documents: ",error);
        return res.status(500).json({error: 'Internal Server Error.'});
    }
}