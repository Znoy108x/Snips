import { Button } from "@/shared/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { monacoThemes } from "./themeData"

interface ThemeDropDownInterface {
    selectedTheme: string,
    onChange: (theme: string) => void,
    disabled: boolean
}

export const ThemeDropDown = ({ selectedTheme, onChange, disabled }: ThemeDropDownInterface) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="space-x-2" disabled={disabled}>
                    <span>
                        {selectedTheme ? selectedTheme : "Select a Theme"}
                    </span>
                    <ChevronDown className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-h-[500px] overflow-y-auto" >
                <DropdownMenuGroup>
                    {
                        Object.entries(monacoThemes).map(([key, value]) => (
                            <DropdownMenuItem key={key} onClick={() => onChange(key)}>
                                {value}
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
