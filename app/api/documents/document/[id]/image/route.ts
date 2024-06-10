import { NextRequest, NextResponse } from "next/server";
import { DocumentModel } from "@/models/DocumentModel";
import { connectToDB } from "@/utils/database";
import { auth } from "@clerk/nextjs/server";

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  if (req.method !== "PATCH")
    return NextResponse.json(
      { message: "Method not allowed." },
      { status: 405 }
    ); // Method Not Allowed
  try {
    const { userId }: { userId: string | null } = auth();
    if (userId === null)
      return NextResponse.json(
        { message: "Not authenticated." },
        { status: 401 }
      );
    await connectToDB();
    const id = await req.json();
    console.log(id);
    const existingDocument = await DocumentModel.findById(id);
    if (!existingDocument)
      return NextResponse.json({ message: "Not found." }, { status: 404 });
    if (existingDocument.userId !== userId)
      NextResponse.json({ message: "Unauthorized." }, { status: 403 });
    await DocumentModel.findByIdAndUpdate(id, { coverImage: "" });
    return NextResponse.json(
      { message: "Cover image removed successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing cover image: ", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
};
