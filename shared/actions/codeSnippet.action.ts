"use server";
import { auth } from "@clerk/nextjs";
import prismadb from "../lib/prismaDb";
import { CodeSnippetDBDataType } from "../types/CodeSnippet.types";

export const getAllCodeSnippets = async () : Promise<CodeSnippetDBDataType[]> => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User id not present");
  }
  const allCodeSnippets = await prismadb.codeSnippets.findMany({
    where: {
      clerkUserId: userId,
    },
  });
  return allCodeSnippets;
};
