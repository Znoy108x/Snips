import { Button } from "@/shared/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { LangType, languageOptions } from "./langData"
import { ChevronDown } from "lucide-react"

interface LanguageDropDownInterface {
    selectedLang: LangType,
    onChange: (lang: LangType) => void,
    disabled: boolean
}

export const LanguageDropDown = ({ selectedLang, onChange, disabled }: LanguageDropDownInterface) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="space-x-2" disabled={disabled}>
                    <span>
                        {Object.keys(selectedLang).length > 0 ? selectedLang.label : "Select a language"}
                    </span>
                    <ChevronDown className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-h-[500px] overflow-y-auto" >
                <DropdownMenuGroup>
                    {
                        languageOptions.map((lang, index) => (
                            <DropdownMenuItem key={index} onClick={() => onChange(lang)}>
                                {lang.label}
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
