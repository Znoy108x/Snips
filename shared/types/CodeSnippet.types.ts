import { CodeSnippets, User } from "@prisma/client";

export type CreateCodeSnippetReqData = {
  name: string;
  language: string;
  theme: string;
  codeContent: string;
};

export type CodeSnippetDBDataType = {
  id: string;
  name: string;
  language: string;
  theme: string;
  isPublished: boolean;
  codeContent: string;
  createdAt: Date;
  updatedAt: Date;
  clerkUserId: string;
};

export type FullUserData = User & {
  codeSnippets: CodeSnippets[];
};
