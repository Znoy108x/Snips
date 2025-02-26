import { Checkbox } from "@/shared/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CodeSnippetDBDataType } from "@/shared/types/CodeSnippet.types";
import { DateFromatter } from "@/shared/lib/dateFromatter";
import { CodeSnippetActions } from "../actions/CodeSnippetActions";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";


export const CodeSnippetTableColumn: ColumnDef<CodeSnippetDBDataType>[] = [
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
    accessorKey: "language",
    header: "Language",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("language")}</div>
    ),
  },
  {
    accessorKey: "theme",
    header: "Theme",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("theme")}</div>
    ),
  },
  {
    accessorKey: "isPublished",
    header: "Published",
    cell: ({ row }) => (
      <div className="">
        {
          row.original.isPublished ? (
            <Button variant={"custom_blue"}>True</Button>
          ) : (
            <Button variant={"custom_red_outlined"}>False</Button>
          )
        }
      </div>
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
      return <CodeSnippetActions rowData={row.original} />
    },
  },
];
