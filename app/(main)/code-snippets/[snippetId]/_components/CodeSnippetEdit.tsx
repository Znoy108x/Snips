"use client"
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { CircleCheckBig, Plus } from 'lucide-react'
import { useRouter } from 'next13-progressbar'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { defineTheme } from '@/shared/lib/themeLoader'
import { DarkToast, PromiseNotification } from '@/shared/lib/Toasts'
import axios from 'axios'
import { CodeSnippetDBDataType, CreateCodeSnippetReqData } from '@/shared/types/CodeSnippet.types'
import { useParams } from 'next/navigation'
import { LangType, languageOptions } from '@/app/(main)/_components/drop-downs/langData'
import { LanguageDropDown } from '@/app/(main)/_components/drop-downs/LanguageDropDown'
import { ThemeDropDown } from '@/app/(main)/_components/drop-downs/ThemeDropDown'
import EditorComp from '@/app/(main)/_components/EditorComp'

export const CodeSnippetEdit = ({ data }: { data?: CodeSnippetDBDataType | null }) => {

    const router = useRouter()
    const { snippetId } = useParams()
    const isCreatePath = snippetId === "new-snippet"
    const [snippetTitle, setSnippetTitle] = useState<string>(isCreatePath ? "" : data?.name || "")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [snippetTheme, setSnippetTheme] = useState<string>("")
    const filteredLang: LangType = languageOptions.filter((lang) => lang.value === data?.language)[0]
    const [snippetLang, setSnippetLang] = useState<LangType>(isCreatePath ? languageOptions[0] : filteredLang)
    const [snippetCode, setSnippetCode] = useState<string | undefined>("console.log('Hello Snips 👾')")

    const resetStateData = () => {
        setSnippetCode("console.log('Hello Snips!')")
        setSnippetTitle("")
    }

    // On Change Handlers 
    const handleCodeChange = (value: string | undefined) => {
        setSnippetCode(value)
    }
    const handleLangChange = (value: LangType) => {
        setSnippetLang({ ...value })
    }
    const handleThemeChange = (th: string) => {
        const theme = th;
        if (["light", "vs-dark"].includes(theme)) {
            setSnippetTheme(theme);
        } else {
            defineTheme(theme).then((_) => setSnippetTheme(theme));
        }
    }

    const handlePostApiCall = async (reqData: CreateCodeSnippetReqData): Promise<void> => {
        try {
            await axios.post("/api/code-snippet", reqData)
        } catch (err: any) {
            throw new Error(err?.response?.data)
        }
    }

    const handlePatchApiCall = async (reqData: CreateCodeSnippetReqData): Promise<void> => {
        try {
            await axios.patch(`/api/code-snippet/${data?.id}`, reqData)
        } catch (err: any) {
            throw new Error(err?.response?.data)
        }
    }

    const handleContentChange = () => {
        setIsSubmitting(true)
        let error = false;
        let errorText = ""
        if (!snippetTitle) {
            error = true;
            errorText = "Snippet name is missing."
        } else if (snippetTitle.length < 4) {
            error = true;
            errorText = "Snippet name must be 4 characters long."
        } else if (!snippetCode) {
            error = true;
            errorText = "Snippet code is missing."
        } else if (!snippetLang) {
            error = true;
            errorText = "Snippet language is missing."
        } else if (!snippetTheme) {
            error = true;
            errorText = "Snippet theme is missing."
        }
        if (error) {
            setIsSubmitting(false)
            DarkToast(errorText)
        } else {
            const reqData: CreateCodeSnippetReqData = {
                name: snippetTitle,
                language: snippetLang.value,
                theme: snippetTheme,
                codeContent: snippetCode!
            }
            if (!isCreatePath) {
                PromiseNotification(
                    handlePatchApiCall(reqData),
                    "Updating snippet.",
                    "Snippet updated successfully",
                    () => {
                        setIsSubmitting(false)
                        resetStateData()
                        router.back()
                        router.refresh()
                    },
                    () => {
                        setIsSubmitting(false)
                    }
                )
            } else {
                PromiseNotification(
                    handlePostApiCall(reqData),
                    "Creating snippet.",
                    "Snippet created successfully",
                    () => {
                        setIsSubmitting(false)
                        resetStateData()
                        router.push("/main/code-snippets")
                        router.refresh()
                    },
                    () => {
                        setIsSubmitting(false)
                    }
                )
            }
        }
    }

    useLayoutEffect(() => {
        if (!isCreatePath) {
            defineTheme(data?.theme!).then(() => setSnippetTheme(data?.theme!))
        } else {
            defineTheme("brilliance-dull").then(() => setSnippetTheme("brilliance-dull"))
        }
    }, [])

    return (
        <div className='w-full h-full flex flex-col items-center justify-center bg-accent bg-[url("/pattern.svg")]'>
            <div className='w-[90%] h-[96%] flex flex-col gap-y-3'>
                <div className='w-full flex flex-col md:flex-row md:items-center justify-between gap-y-3'>
                    <div className='flex items-center gap-x-4'>
                        <Input placeholder='File name' className='text-md h-10' value={snippetTitle} onChange={(e) => setSnippetTitle(e.target.value)} disabled={isSubmitting} />
                        <LanguageDropDown selectedLang={snippetLang} onChange={handleLangChange} disabled={isSubmitting} />
                        <ThemeDropDown onChange={handleThemeChange} selectedTheme={snippetTheme} disabled={isSubmitting} />
                    </div>
                    <div className='flex items-center justify-between gap-x-3'>
                        <Button className='w-1/2' variant={"custom_blue_outlined"} size="sm" onClick={() => {
                            router.back()
                        }} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button className='text-white w-1/2' size="sm" disabled={isSubmitting} onClick={handleContentChange}>
                            <Plus className='size-5 mr-1' />
                            {isCreatePath ? "Create" : "Save"}
                        </Button>
                    </div>
                </div>
                <div className='grow bg-[#0A0B10] rounded-xl overflow-hidden p-3'>
                    <EditorComp theme={snippetTheme} code={snippetCode} language={snippetLang} onChange={handleCodeChange} />
                </div>
            </div>
        </div>
    )
}