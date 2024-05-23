import { DocumentModel } from "@/models/DocumentModel";
import { connectToDB } from "@/utils/database";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  if (req.method !== "GET") {
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
    const id = req.nextUrl.searchParams.get("documentId");
    const document = await DocumentModel.findById(id);
    if (!document)
      return NextResponse.json({ message: "Not Found." }, { status: 404 });
    if (document.userId !== userId)
      return NextResponse.json({ message: "Unauthorized." }, { status: 403 });
    if (document.isPublished && !document.isArchived)
      return NextResponse.json(document, { status: 200 });
    return NextResponse.json(document, { status: 200 });
  } catch (error) {
    console.error("Error fetching document by Id: ", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
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
    const body = await req.json();
    const { id, ...rest } = body;
    const existingDocument = await DocumentModel.findById(id);
    if (!existingDocument) {
      return NextResponse.json({ message: "Not Found." }, { status: 404 });
    }
    if (existingDocument.userId !== userId)
      return NextResponse.json({ message: "Unauthorized." }, { status: 403 });
    // find the document by id and update it
    const updatedData = {
      ...rest,
      updatedAt: new Date(),
    };
    const updatedDocument = await DocumentModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    return NextResponse.json(updatedDocument, { status: 200 });
  } catch (error) {
    console.error("Error updating document: ", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  if (req.method !== "DELETE") {
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
    if (!existingDocument)
      return NextResponse.json({ message: "Not Found." }, { status: 404 });
    if (existingDocument.userId !== userId)
      return NextResponse.json({ message: "Unauthorized." }, { status: 403 });
    await DocumentModel.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Document Deleted Successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting document: ", error);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
};
