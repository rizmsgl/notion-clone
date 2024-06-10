import { DocumentModel } from "@/models/DocumentModel";
import { connectToDB } from "@/utils/database";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return Response.json({ message: "Method not allowed." }, { status: 405 }); // Method Not Allowed
  }

  const data = await req.json();
  const { parentDocument } = data;
  console.log(data);
  if (!parentDocument) {
    return Response.json(
      { message: "Parent document id is required." },
      { status: 400 }
    );
  }

  try {
    const { userId }: { userId: string | null } = auth();
    if (userId === null) {
      return Response.json({ message: "Not authenticated." }, { status: 401 });
    }
    await connectToDB();
    const documents = await DocumentModel.find({
      userId,
      parentDocument,
      isArchived: false,
    }).sort({ updatedAt: -1 });
    return Response.json(documents, { status: 201 });
  } catch (error) {
    console.error("Error fetching documents by parentId: ", error);
    return Response.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
