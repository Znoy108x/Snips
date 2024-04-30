import React from "react";
import PageTitle from "../_components/PageTitle";
import prismadb from "@/shared/lib/prismaDb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CodeSnippetDBDataType, SnapShotWithSnippet } from "@/shared/types/CodeSnippet.types";
import SnapShotTable from "../_components/tables/SnapShotTable";

const SnapShotsPage = async () => {

    const { userId } = auth()
    if (!userId) {
        return redirect("/sign-in")
    }

    const snapShotsWithSnippetInfo: SnapShotWithSnippet[] = await prismadb.snapShot.findMany({
        where: {
            clerkUserId: userId
        },
        include: {
            codeSnippet: true
        }
    })

    return (
        <div className="h-full w-full overflow-y-auto p-5">
            <PageTitle title="Code Snap Shots" />
            <SnapShotTable data={snapShotsWithSnippetInfo} />
        </div>
    )
};

export default SnapShotsPage