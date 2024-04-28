"use client"
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Plus } from 'lucide-react'
import { useRouter } from 'next13-progressbar'
import React, { useLayoutEffect, useState } from 'react'
import EditorComp from '../../_components/EditorComp'
import { LanguageDropDown } from '../../_components/drop-downs/LanguageDropDown'
import { LangType, languageOptions } from '../../_components/drop-downs/langData'
import { defineTheme } from '@/shared/lib/themeLoader'
import { ThemeDropDown } from '../../_components/drop-downs/ThemeDropDown'
import { DarkToast, PromiseNotification } from '@/shared/lib/Toasts'
import axios from 'axios'
import { CreateCodeSnippetReqData } from '@/shared/types/CodeSnippet.types'
import { useClerk } from '@clerk/nextjs'

const NewSnippetPage = () => {

    const router = useRouter()
    const [snippetTitle, setSnippetTitle] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [snippetTheme, setSnippetTheme] = useState<string>("")
    const [snippetLang, setSnippetLang] = useState<LangType>(languageOptions[0])
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
    const handlePostApiCall = async (data: CreateCodeSnippetReqData): Promise<void> => {
        try {
            await axios.post("/api/code-snippet", data)
        } catch (err: any) {
            throw new Error(err)
        }
    }
    const handleContentCreate = () => {
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
            const data: CreateCodeSnippetReqData = {
                name: snippetTitle,
                language: snippetLang.value,
                theme: snippetTheme,
                codeContent: snippetCode!
            }
            PromiseNotification(
                handlePostApiCall(data),
                "Creating snippet.",
                "Snippet created successfully",
                () => {
                    setIsSubmitting(false)
                    resetStateData()
                },
                () => {
                    setIsSubmitting(false)
                }
            )
        }
    }

    useLayoutEffect(() => {
        defineTheme("brilliance-dull").then(() => setSnippetTheme("brilliance-dull"))
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
                        <Button className='text-white w-1/2' size="sm" disabled={isSubmitting} onClick={handleContentCreate}>
                            <Plus className='size-5 mr-2' />
                            Create
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

export default NewSnippetPage