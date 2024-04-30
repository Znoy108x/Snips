"use client"
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"
import { CodeSnippetDBDataType } from "../types/CodeSnippet.types"
type CodeSnippetType = {
    codeSnippets: CodeSnippetDBDataType[],
    setCodeSnippets: Dispatch<SetStateAction<CodeSnippetDBDataType[]>>
}

const CodeSnippetContext = createContext<CodeSnippetType | undefined>(undefined)

export const CodeSnippetProvider = ({ children }: { children: React.ReactNode }) => {

    const [codeSnippets, setCodeSnippets] = useState<CodeSnippetDBDataType[]>([])

    const values: CodeSnippetType = {
        codeSnippets,
        setCodeSnippets
    }

    return (
        <CodeSnippetContext.Provider value={values}>
            {children}
        </CodeSnippetContext.Provider>
    )
}


export const useCodeSnippetContext = () => {
    const context = useContext(CodeSnippetContext)
    if (!context) {
        throw new Error("useCodeSnippetContext must be used inside CodeSnippetProvider")
    }
    return context
}