import { Editor } from '@monaco-editor/react'
import React from 'react'
import { LangType } from './drop-downs/langData'

interface EditorCompProps {
    language: LangType,
    theme: string,
    code: string | undefined,
    onChange: (value: string | undefined) => void
}

const EditorComp = ({ theme, code, onChange, language }: EditorCompProps) => {
    return (
        <Editor theme={theme} value={code} language={language.value} height={"99%"} width={"100%"} defaultValue='Paste your code here!' onChange={onChange} />
    )
}

export default EditorComp