import { NextRequest, NextResponse } from "next/server";
import { DocumentModel } from "@/models/DocumentModel";
import { connectToDB } from "@/utils/database";
import { auth } from "@clerk/nextjs";

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  if (req.method !== "PATCH")
    return NextResponse.json(
      { message: "Method not allowed." },
      { status: 405 }
    );
  try {
    const { userId }: { userId: string | null } = auth();
    if (userId === null)
      return NextResponse.json(
        { message: "Not Authenticated." },
        { status: 401 }
      );
    await connectToDB();
    const id = await req.json();
    const existingDocument = await DocumentModel.findById(id);
    if (!existingDocument)
      return NextResponse.json({ message: "Not Found." }, { status: 404 });
    if (existingDocument.userId !== userId)
      return NextResponse.json({ message: "Unauthorized." }, { status: 403 });
    await DocumentModel.findByIdAndUpdate(id, { isArchived: false });

    // recursive restore
    const recursiveRestore = async (
      documentId: string | string[] | undefined
    ) => {
      const children = await DocumentModel.find({
        userId,
        parentDocument: documentId,
      });
      for (const child of children) {
        await DocumentModel.findByIdAndUpdate(child._id, { isArchived: false });
        await recursiveRestore(child._id);
      }
    };

    await recursiveRestore(id);
    return NextResponse.json(
      { message: "Document Restored Successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error restoring document: ", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
};
