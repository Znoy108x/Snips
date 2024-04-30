import { Checkbox } from "@/shared/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DateFromatter } from "@/shared/lib/dateFromatter";
import { CodeSnippetActions } from "../actions/CodeSnippetActions";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { SnapShotWithSnippet } from "@/shared/types/CodeSnippet.types";
import { SnapShotActions } from "../actions/SnapShotActions";


export const CodeSnapShotColumns: ColumnDef<SnapShotWithSnippet>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <Link href={`/code-snippets/${row.original.id}`} className="capitalize text-cblue underline underline-offset-4 font-medium text-md">{row.getValue("name")}</Link>
    ),
  },
  {
    accessorKey: "codeSnippet",
    header: "Snippet Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("codeSnippet")?.name}</div>
    ),
  },
  {
    accessorKey: "gradientName",
    header: "Gradient Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("gradientName")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div className="capitalize">{DateFromatter(String(row.getValue("createdAt")))}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <SnapShotActions rowData={row.original} />
    },
  },
];
