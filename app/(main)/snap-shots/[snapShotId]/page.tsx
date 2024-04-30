"use client"
import React, { useEffect, useState } from 'react'
import ThemeComboBox from '../../_components/combo-box/ThemeComboBox'
import { GradientsDetails } from '@/shared/lib/gradientsDetails'
import { cn } from '@/shared/lib/utils'
import CodeSnippetComboBox from '../../_components/combo-box/CodeSnippetComboBox'
import { useCodeSnippetContext } from '@/shared/context/CodeSnippetContext'
import dedent from "dedent"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, dark, dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const SnapShotOperationPage = () => {

    const { codeSnippets } = useCodeSnippetContext()
    const [selectedCodeSnippet, setSelectedCodeSnippet] = useState<string>("")
    const [gradientKey, setGradientKey] = useState<keyof typeof GradientsDetails>("hyper")

    const onChangeGradientKey = (key: keyof typeof GradientsDetails) => {
        setGradientKey(key)
    }

    const onChangeCodeSnippet = (val: string) => {
        setSelectedCodeSnippet(val)
    }

    return (
        <div className="w-full h-full bg-[url('/pattern.svg')] bg-slate-800 flex items-center justify-center">
            <div className='w-[93%] h-[93%] flex flex-col gap-y-4'>
                <div className='w-full flex items-center justify-start gap-x-4'>
                    <ThemeComboBox onChange={onChangeGradientKey} />
                    <CodeSnippetComboBox onChange={onChangeCodeSnippet} />
                </div>
                <div className={cn('grow rounded-2xl flex items-center justify-center', GradientsDetails[gradientKey])}>
                    <div className='h-auto w-auto  flex flex-col bg-[#22272D] rounded-2xl overflow-hidden'>
                        <div className='w-full h-12  bg-[#2F3439] p-3 flex items-center gap-x-2'>
                            <span className=' block size-4 rounded-full bg-[#FF5F57]' />
                            <span className=' block size-4 rounded-full bg-[#FEBC2E]' />
                            <span className=' block size-4 rounded-full bg-[#27C840]' />
                        </div>
                        <div className='w-full h-auto p-5 text-xs'>
                            {
                                selectedCodeSnippet && (
                                    <SyntaxHighlighter language="javascript" style={dracula} customStyle={{
                                        backgroundColor: "#22272D"
                                    }}>
                                        {dedent(selectedCodeSnippet)}
                                    </SyntaxHighlighter>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SnapShotOperationPage