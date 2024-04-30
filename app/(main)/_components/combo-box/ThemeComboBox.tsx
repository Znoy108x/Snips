"use client"
import React, { useEffect } from 'react'
import { cn } from "@/shared/lib/utils"
import { ChevronsUpDown } from "lucide-react"
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

interface ThemeComboboxProps {
    onChange: (key: keyof typeof GradientsDetails) => void
}

const ThemeComboBox = ({ onChange }: ThemeComboboxProps) => {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState<keyof typeof GradientsDetails>("hyper")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-[200px] justify-between", value && "capitalize")}>
                    {value ? value : "Select Gradient"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] max-h-[500px] overflow-y-auto p-0">
                <Command>
                    <CommandInput placeholder="Search Gradient..." />
                    <CommandEmpty>No gradient with this name found.</CommandEmpty>
                    <CommandGroup>
                        {
                            Object.entries(GradientsDetails).map(([key, val]) => (
                                <CommandItem
                                    key={key}
                                    value={key}
                                    onSelect={(currentValue) => {
                                        onChange(key)
                                        setValue(key)
                                        setOpen(false)
                                    }}>
                                    <div className={cn(val, "rounded-md p-2 capitalize w-full cursor-pointer text-gray-700 font-normal")}>
                                        {key}
                                    </div>
                                </CommandItem>
                            ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default ThemeComboBox