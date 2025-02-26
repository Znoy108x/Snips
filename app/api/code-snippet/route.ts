import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/shared/lib/prismaDb";
import { CreateCodeSnippetReqData } from "@/shared/types/CodeSnippet.types";

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
    const { name, language, theme, codeContent }: CreateCodeSnippetReqData =
      await req.json();
    if (!name || !language || !theme || !codeContent) {
      return new NextResponse(
        "Please give all fields to create new code snippet",
        { status: 400 }
      );
    }
    const isPresent = await prismadb.codeSnippets.findFirst({
      where: {
        clerkUserId: userId,
        name: name,
      },
    });
    if (isPresent) {
      return new NextResponse(
        "Name must be unique, please give it a different name",
        { status: 400 }
      );
    }
    const newCodeSnippet = await prismadb.codeSnippets.create({
      data: {
        name,
        language,
        theme,
        codeContent,
        clerkUserId: userId,
      },
    });
    return NextResponse.json(newCodeSnippet);
  } catch (err: any) {
    return new NextResponse("Something Went Wrong", { status: 501 });
  }
}
