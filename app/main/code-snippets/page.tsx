"use client"
import React from "react";
import PageTitle from "../_components/PageTitle";
import { CustomTable } from "../_components/tables/CustomTable";
import { columns } from "../_components/tables/columns/CodeSnippetColumns";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
];

const CodeSnippetPage = () => {
  return (
    <div className="h-full w-full overflow-y-auto p-5">
      <PageTitle title="Code Snippets" />
      <CustomTable data={data} columns={columns} />
    </div>
  )
};

export default CodeSnippetPage;
