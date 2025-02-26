import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/shared/lib/prismaDb";
import {
  CreateCodeSnippetReqData,
  CreateSnapShotReqData,
} from "@/shared/types/CodeSnippet.types";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("You are not loggedin!", { status: 400 });
    }
    const isUserPresent = await prismadb.user.findFirst({
      where: {
        clerkUserId: userId,
      },
    });
    if (!isUserPresent) {
      return new NextResponse("User not present in the data base!", {
        status: 400,
      });
    }
    const { name, codeSnippetId, gradientName }: CreateSnapShotReqData =
      await req.json();
    if (!name || !codeSnippetId || !gradientName) {
      return new NextResponse(
        "Please give all fields to create new code snippet",
        { status: 400 }
      );
    }
    const newSnapShot = await prismadb.snapShot.create({
      data: {
        clerkUserId: userId,
        name,
        gradientName,
        codeSnippetId,
      },
    });
    return NextResponse.json(newSnapShot);
  } catch (err: any) {
    return new NextResponse("Something Went Wrong", { status: 501 });
  }
}
