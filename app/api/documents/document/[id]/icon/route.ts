import { NextRequest, NextResponse } from "next/server";
import { DocumentModel } from "@/models/DocumentModel";
import { connectToDB } from "@/utils/database";
import { auth } from "@clerk/nextjs";

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  if (req.method !== "PATCH") {
    return NextResponse.json(
      { message: "Method not allowed." },
      { status: 405 }
    ); // Method Not Allowed
  }
  try {
    const { userId }: { userId: string | null } = auth();
    if (userId === null)
      return NextResponse.json(
        { message: "Not Authenticated." },
        { status: 401 }
      );
    await connectToDB();
    const { id } = await req.json();
    const existingDocument = await DocumentModel.findById(id);
    if (!existingDocument)
      return NextResponse.json({ message: "Not Found." }, { status: 404 });
    if (existingDocument.userId !== userId)
      return NextResponse.json({ message: "Unauthorized." }, { status: 403 });
    // Remove the icon from the document
    await DocumentModel.findByIdAndUpdate(id, { icon: undefined });
    return NextResponse.json(
      { message: "Icon Removed Successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing icon from document: ", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
};
