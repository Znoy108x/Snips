import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/shared/lib/prismaDb";

export async function DELETE(
  req: NextRequest,
  { params: { snippetId } }: { params: { snippetId: string } }
) {
  //   try {
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
  const currentSnippet = await prismadb.codeSnippets.findUnique({
    where: {
      id: snippetId,
    },
  });
  if (!currentSnippet) {
    return new NextResponse("Code snippet not present in the data base!", {
      status: 400,
    });
  }
  const deletedSnippet = await prismadb.codeSnippets.delete({
    where: {
      id: snippetId,
    },
  });
  return NextResponse.json(deletedSnippet);
  //   } catch (err: any) {
  //     return new NextResponse("Something Went Wrong", { status: 501 });
  //   }
}
