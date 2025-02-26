import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/shared/lib/prismaDb";

export async function DELETE(
  req: NextRequest,
  { params: { snapShotId } }: { params: { snapShotId: string } }
) {
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
    const currentSnippet = await prismadb.snapShot.findUnique({
      where: {
        id: snapShotId,
      },
    });
    if (!currentSnippet) {
      return new NextResponse("Snap Shot not present in the data base!", {
        status: 400,
      });
    }
    const deletedSnippet = await prismadb.snapShot.delete({
      where: {
        id: snapShotId,
      },
    });
    return NextResponse.json(deletedSnippet);
  } catch (err: any) {
    return new NextResponse("Something Went Wrong", { status: 501 });
  }
}
