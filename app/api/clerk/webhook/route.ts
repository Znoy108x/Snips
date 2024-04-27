import { NextRequest, NextResponse } from "next/server";
import { WebhookEvent } from "@clerk/nextjs/server";
import prismaDb from "@/shared/lib/prismaDb";

export async function POST(req: NextRequest) {
  const payload: WebhookEvent = await req.json();
  const { type, data } = payload;
  try {
    if (type === "user.created") {
      console.log(data);
      const emailAddress = data.email_addresses[0].email_address;
      const { first_name, last_name, image_url, id } = data;
      const userData = await prismaDb.user.create({
        data: {
          clerkUserid: id,
          emailAddress,
          firstName: first_name,
          lastName: last_name,
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
    console.log("CLERK__WEBHOOK__ERROR");
    return NextResponse.json(
      { mssage: "Something went wrong" },
      { status: 501 }
    );
  }
}
