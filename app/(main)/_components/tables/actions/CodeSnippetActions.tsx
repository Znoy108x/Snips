"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { Copy, Sparkles, Trash } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { CodeSnippets } from "@prisma/client";
import { PromiseNotification, SuccessNotification } from "@/shared/lib/Toasts";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import ShareClinkModal from "../../dialogs/ShareCopylinkModal";

export const CodeSnippetActions = ({ rowData }: { rowData: CodeSnippets }) => {
  const router = useRouter();
  const [actionInProgress, setActionInProgress] = useState(false);

  // Action Handle Functions
  const handleSaveAction = () => {
    setActionInProgress(true);
    PromiseNotification(
      publishCodeSnippet(),
      "Publishing, please wait!",
      "Published Successfully!",
      () => {
        setActionInProgress(false);
        router.refresh();
      },
      () => {
        setActionInProgress(false);
      },
    );
  };

  const handleDeleteAction = () => {
    setActionInProgress(true);
    PromiseNotification(
      deleteCodeSnippet(),
      "Deleting, please wait!",
      "Deleted Successfully!",
      () => {
        setActionInProgress(false);
        router.refresh();
      },
      () => {
        setActionInProgress(false);
      },
    );
  };

  const handleCopyCodeSnippetLink = () => {
    const link = `https://snips-tau.vercel.app/code-share/${rowData.id}`;
    navigator.clipboard.writeText(link);
    SuccessNotification("Link Copied");
  };

  // Api Functions
  const publishCodeSnippet = async (): Promise<void> => {
    try {
      await axios.patch(`/api/code-snippet/publish/${rowData.id}`);
    } catch (err: any) {
      throw new Error(err?.response?.data);
    }
  };

  const deleteCodeSnippet = async (): Promise<void> => {
    try {
      await axios.delete(`/api/code-snippet/${rowData.id}`);
    } catch (err: any) {
      throw new Error(err?.response?.data);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="w-full"
            disabled={rowData.isPublished ? true : actionInProgress}
          >
            <Button className="w-full text-white" onClick={handleSaveAction}>
              <Sparkles className="size-4 mr-2" />
              <span>Publish</span>
            </Button>
          </DropdownMenuItem>
          {rowData.isPublished && (
            <DropdownMenuItem
              className="w-full"
              onClick={handleCopyCodeSnippetLink}
            >
              <Button className="w-full text-white">
                <Copy className="size-4 mr-2" />
                <span>Copy Link</span>
              </Button>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="w-full"
            disabled={actionInProgress}
            onClick={handleDeleteAction}
          >
            <Button
              variant={"custom_destructive"}
              className="w-full text-white"
            >
              <Trash className="size-4 mr-2" />
              <span>Delete</span>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
