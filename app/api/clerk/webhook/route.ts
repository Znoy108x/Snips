import { NextRequest, NextResponse } from "next/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import prismaDb from "@/shared/lib/prismaDb";

export async function POST(req: NextRequest) {
  const payload: WebhookEvent = await req.json();
  const { type, data } = payload;
  try {
    if (type === "user.created") {
      // console.log(data);
      const emailAddress = data.email_addresses[0].email_address;
      const { first_name, last_name, image_url, id } = data;
      const isUserAlreadyPresent = await prismaDb.user.findUnique({
        where: {
          emailAddress,
        },
      });
      if (isUserAlreadyPresent) {
        return new NextResponse("User already present", { status: 400 });
      }
      await prismaDb.user.create({
        data: {
          clerkUserId: id,
          emailAddress,
          firstName: first_name,
          lastName: last_name || "",
          imageUrl: image_url,
        },
      });
      return NextResponse.json({ message: "User Created" }, { status: 200 });
    } else if (type === "user.deleted") {
      console.log("USER_DELETED_EVENT");
    } else {
      console.log("USER_UPDATED_EVENT");
    }
  } catch (err) {
    console.log("CLERK__WEBHOOK__ERROR", err);
    return NextResponse.json(
      { mssage: "Something went wrong" },
      { status: 501 }
    );
  }
}
