import { DocumentModel } from "@/models/DocumentModel";
import { connectToDB } from "@/utils/database";
import { auth } from "@clerk/nextjs";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const parentDocument = req.nextUrl.searchParams.get("parentDocument");
  if (req.method !== "GET")
    return Response.json({ message: "Method not allowed." }, { status: 405 });
  try {
    const { userId }: { userId: string | null } = auth();
    if (userId === null) {
      return Response.json({ error: "Not authenticated." });
    }
    await connectToDB();
    const query: any = {
      userId,
      isArchived: false,
    };
    if (parentDocument) query.parentDocument = parentDocument;
    else query.parentDocument = null;
    const documents = await DocumentModel.find(query).sort({ updatedAt: -1 });
    return Response.json(documents);
  } catch (error) {
    console.error("Error fetching search documents: ", error);
    return Response.json({ error: "Internal server error." });
  }
}
