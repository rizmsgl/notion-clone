import { NextRequest, NextResponse } from "next/server";
import { DocumentModel } from "@/models/DocumentModel";
import { connectToDB } from "@/utils/database";
import { auth } from "@clerk/nextjs/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  if (req.method !== "GET")
    return NextResponse.json(
      { message: "Method not allowed." },
      { status: 405 }
    ); // Method Not Allowed
  try {
    const { userId }: { userId: string | null } = auth();
    if (userId === null)
      return NextResponse.json(
        { message: "Not Authenticated." },
        { status: 401 }
      );

    await connectToDB();
    const documents = await DocumentModel.find({
      userId,
      isArchived: true,
    }).sort({ updatedAt: -1 });
    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    console.error("Error fetching trashed documents: ", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
};
