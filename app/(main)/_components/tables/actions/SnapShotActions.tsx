"use client"
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Button } from "@/shared/components/ui/button";
import { FileDown, FilePenLine, Sparkles, Trash } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { PromiseNotification } from '@/shared/lib/Toasts';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SnapShotWithSnippet } from '@/shared/types/CodeSnippet.types';


export const SnapShotActions = ({ rowData }: { rowData: SnapShotWithSnippet }) => {

    const router = useRouter()
    const [actionInProgress, setActionInProgress] = useState(false)

    // Action Handle Functions
    const handleDeleteAction = () => {
        setActionInProgress(true)
        PromiseNotification(
            deleteCodeSnippet(),
            "Deleting, please wait!",
            "Deleted Successfully!",
            () => {
                setActionInProgress(false)
                router.refresh()
            },
            () => {
                setActionInProgress(false)
            }
        )
    }

    // Api Functions
    const deleteCodeSnippet = async (): Promise<void> => {
        try {
            await axios.delete(`/api/snap-shot/${rowData.id}`)
        } catch (err: any) {
            throw new Error(err?.response?.data)
        }
    }

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0" >
                    <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="w-full" disabled={actionInProgress} onClick={handleDeleteAction}>
                    <Button variant={"custom_destructive"} className="w-full text-white">
                        <Trash className="size-4 mr-2" />
                        <span>
                            Delete
                        </span>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}