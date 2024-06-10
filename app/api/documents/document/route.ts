import { DocumentModel } from "@/models/DocumentModel";
import { connectToDB } from "@/utils/database";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return Response.json({ message: "Method not allowed." }, { status: 405 });
    // Method Not Allowed
  }
  try {
    const { userId }: { userId: string | null } = auth();
    if (userId === null) {
      return Response.json({ message: "Not authenticated." }, { status: 401 });
    }
    await connectToDB();
    const data = await req.json();
    const { title, parentDocument } = data;
    // Create a new document
    const document = new DocumentModel({
      title,
      parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });
    await document.save();
    return Response.json(document, { status: 201 });
  } catch (error) {
    console.error("Error creating document: ", error);
    return Response.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
