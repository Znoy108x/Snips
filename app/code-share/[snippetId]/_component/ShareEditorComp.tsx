"use client"
import EditorComp from '@/app/(main)/_components/EditorComp'
import { LangType, languageOptions } from '@/app/(main)/_components/drop-downs/langData'
import { defineTheme } from '@/shared/lib/themeLoader'
import { CodeSnippetDBDataType } from '@/shared/types/CodeSnippet.types'
import React, { useLayoutEffect, useState } from 'react'

const ShareEditorComp = ({ data }: { data: CodeSnippetDBDataType }) => {

    const [snippetTheme, setSnippetTheme] = useState<string>("")
    const filteredLang: LangType = languageOptions.filter((lang) => lang.value === data?.language)[0]

    useLayoutEffect(() => {
        defineTheme("brilliance-dull").then(() => setSnippetTheme("brilliance-dull"))
    }, [])

    return (
        <div className='w-[95%] h-[95%] lg:w-[70%] lg:h-[60%]'>
            <EditorComp theme={snippetTheme} code={data.codeContent} language={filteredLang} />
        </div>
    )
}

export default ShareEditorComp