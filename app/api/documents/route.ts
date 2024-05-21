import {NextApiRequest, NextApiResponse} from "next";
import {DocumentModel} from "@/models/DocumentModel";
import {connectToDB} from "@/utils/database";
import {auth} from "@clerk/nextjs";

export const GET = async (req: NextApiRequest, res:NextApiResponse) =>{
    try{
        const {userId} : {userId: string | null} = auth();
        if (userId === null){
            return Response.json({error: 'Not Authenticated.'});
        }
        await connectToDB();
        const documents = await DocumentModel.find({
            userId,
            isArchived: false,
        }).sort({updatedAt: -1});
        return Response.json(documents);
    }catch(error){
        console.error("Error fetching search documents: ",error);
        return Response.json({error: 'Internal Server Error.'});
    }
}