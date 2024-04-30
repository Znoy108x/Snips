import React from "react";
import PageTitle from "../_components/PageTitle";
import CodeSnippetsTable from "../_components/tables/CodeSnippetsTable";
import prismadb from "@/shared/lib/prismaDb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CodeSnippetDBDataType, FullUserData } from "@/shared/types/CodeSnippet.types";

const CodeSnippetPage = async () => {

  const { userId } = auth()
  if (!userId) {
    return redirect("/sign-in")
  }

  const userData: FullUserData | null = await prismadb.user.findUnique({
    where: {
      clerkUserId: userId
    },
    include: {
      codeSnippets: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  const codeSnippetsData: CodeSnippetDBDataType[] = userData?.codeSnippets || []

  return (
    <div className="h-full w-full overflow-y-auto p-5">
      <PageTitle title="Code Snippets" />
      <CodeSnippetsTable data={codeSnippetsData} />
    </div>
  )
};

export default CodeSnippetPage;
