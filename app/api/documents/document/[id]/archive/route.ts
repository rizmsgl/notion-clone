import { NextRequest, NextResponse } from "next/server";
import { DocumentModel } from "@/models/DocumentModel";
import { connectToDB } from "@/utils/database";
import { auth } from "@clerk/nextjs/server";

export const PUT = async (
  req: NextRequest,
  res: NextResponse
): Promise<Response> => {
  if (req.method !== "PUT") {
    return NextResponse.json(
      { message: "Method not allowed." },
      { status: 405 }
    );
  }
  try {
    const { userId }: { userId: string | null } = auth();
    if (userId === null) {
      return NextResponse.json(
        { message: "Not Authenticated." },
        { status: 401 }
      );
    }
    await connectToDB();
    const id = await req.json();
    const existingDocument = await DocumentModel.findById(id);
    if (!existingDocument) {
      return NextResponse.json({ message: "Not Found." }, { status: 404 });
    }
    if (existingDocument.userId !== userId)
      return NextResponse.json({ message: "Unauthorized." }, { status: 403 });
    await DocumentModel.findByIdAndUpdate(id, { isArchived: true });

    // Recursive archive function to handle children documents
    const recursiveArchive = async (
      documentId: string | string[] | undefined
    ) => {
      const children = await DocumentModel.find({
        userId,
        parentDocument: documentId,
      });
      for (const child of children) {
        await DocumentModel.findByIdAndUpdate(child._id, { isArchived: true });
        await recursiveArchive(child._id);
      }
    };
    await recursiveArchive(id);
    return NextResponse.json(
      { message: "Document Archived Successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error archiving document:", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
};
