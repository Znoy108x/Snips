"use client"
import React, { useEffect, useState } from 'react'
import { cn } from "@/shared/lib/utils"
import { ChevronsUpDown, Loader } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { GradientsDetails } from '@/shared/lib/gradientsDetails'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/shared/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shared/components/ui/popover"
import { useCodeSnippetContext } from '@/shared/context/CodeSnippetContext'
import { CodeSnippetDBDataType } from '@/shared/types/CodeSnippet.types'
import { getAllCodeSnippets } from '@/shared/actions/codeSnippet.action'

interface CodeSnippetComboBoxProps {
    onChange: (key: keyof typeof GradientsDetails) => void
}

const CodeSnippetComboBox = ({ onChange }: CodeSnippetComboBoxProps) => {

    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = React.useState(false)
    const [codeSnippets, setCodeSnippets] = useState<CodeSnippetDBDataType[]>([])
    const [value, setValue] = React.useState<CodeSnippetDBDataType>({} as CodeSnippetDBDataType)

    const fetchCodeSnippets = async () => {
        const allCodeSnippets = await getAllCodeSnippets()
        setCodeSnippets(allCodeSnippets)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchCodeSnippets()
    }, [])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-[200px] justify-between", value && "capitalize")}>
                    {
                        isLoading ? (
                            <span>Loading...</span>
                        ) : (
                            <>
                                {Object.keys(value).length > 0 ? value.name : "Select Snippet"}
                            </>
                        )
                    }
                    {
                        isLoading ? (
                            <Loader className='animate-spin size-4' />
                        ) : (
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        )
                    }
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] max-h-[500px] overflow-y-auto p-0">
                <Command>
                    <CommandInput placeholder="Search Gradient..." />
                    <CommandEmpty>No snippet with this name found.</CommandEmpty>
                    <CommandGroup>
                        {
                            codeSnippets.map((snippet) => (
                                <CommandItem
                                    key={snippet.id}
                                    value={snippet.name}
                                    onSelect={(currentValue) => {
                                        onChange(snippet.codeContent)
                                        setValue(snippet)
                                        setOpen(false)
                                    }}>
                                    {snippet.name}
                                </CommandItem>
                            ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default CodeSnippetComboBox