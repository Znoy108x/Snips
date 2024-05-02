"use client"
import React, { useState } from 'react'
import { GradientsDetails } from '@/shared/lib/gradientsDetails'
import { cn } from '@/shared/lib/utils'
import dedent from "dedent"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CodeSnippetDBDataType, SnapShotWithSnippet } from '@/shared/types/CodeSnippet.types'
import { Button } from '@/shared/components/ui/button'
import { ArrowDownToLine, Plus, Save } from 'lucide-react'
import { Input } from '@/shared/components/ui/input'
import { useRouter } from 'next13-progressbar'
import { ErrorNotification, PromiseNotification } from '@/shared/lib/Toasts'
import axios from 'axios'
import html2canvas from "html2canvas"
import ThemeComboBox from '@/app/(main)/_components/combo-box/ThemeComboBox'
import CodeSnippetComboBox from '@/app/(main)/_components/combo-box/CodeSnippetComboBox'

const SnapShotEditor = ({ data, isCreatePath }: { data: SnapShotWithSnippet | null, isCreatePath: boolean }) => {

    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [snapShotName, setSnapShotName] = useState<string>(data ? data.name : "")
    const [selectedCodeSnippet, setSelectedCodeSnippet] = useState<CodeSnippetDBDataType>(data ? data.codeSnippet : {} as CodeSnippetDBDataType)
    const [gradientKey, setGradientKey] = useState<keyof typeof GradientsDetails>(data ? data.gradientName : "hyper")

    const onChangeGradientKey = (key: keyof typeof GradientsDetails) => {
        setGradientKey(key)
    }

    const onChangeCodeSnippet = (val: CodeSnippetDBDataType) => {
        setSelectedCodeSnippet({ ...val })
    }

    const isValidToGenerate = Object.keys(selectedCodeSnippet).length > 0

    const createSnapShotApiCall = async (): Promise<void> => {
        try {
            await axios.post("/api/snap-shot", {
                name: snapShotName,
                codeSnippetId: selectedCodeSnippet.id,
                gradientName: gradientKey
            })
        } catch (err: any) {
            throw new Error(err?.response?.data)
        }
    }

    const handleCreateSnippet = () => {
        if (!snapShotName) {
            return ErrorNotification("Please give title to this snapshot!")
        } else if (!isValidToGenerate) {
            return ErrorNotification("Please select a code-snippet!")
        } else {
            PromiseNotification(
                createSnapShotApiCall(),
                "Creating snap-shot.",
                "Snap Shot created successfully",
                () => {
                    setIsSubmitting(false)
                    router.back()
                    router.refresh()
                },
                () => {
                    setIsSubmitting(false)
                }
            )
        }
    }

    const convertCanvasToImage = () => {
        if (snapShotName) {
            if (typeof document !== 'undefined') {
                const container: HTMLElement = document.getElementById(`snapShotImage`) as HTMLElement;
                html2canvas(container).then((canvas: any) => {
                    const image = canvas.toDataURL('png');
                    const a = document.createElement('a');
                    a.href = image;
                    a.download = snapShotName + '.png';
                    a.click()
                });
            }
        } else {
            ErrorNotification("Please give snapshot name")
        }
    }

    return (
        <div className="w-full h-full bg-[url('/pattern.svg')] bg-slate-800 flex  items-center justify-center ">
            <div className='w-[93%] h-[93%] flex flex-col gap-y-10 items-center '>
                <div className={cn('w-full flex items-center justify-between gap-x-4 ', !isCreatePath && "justify-end")}>
                    {
                        isCreatePath && (
                            <div className='flex items-center gap-x-4'>
                                <Input placeholder='File name' className='text-md w-[250px] h-10' value={snapShotName} onChange={(e) => setSnapShotName(e.target.value)} disabled={isSubmitting} />
                                <ThemeComboBox disabled={isSubmitting} onChange={onChangeGradientKey} />
                                <CodeSnippetComboBox initialData={selectedCodeSnippet} disabled={isSubmitting} onChange={onChangeCodeSnippet} />
                            </div>
                        )
                    }
                    <div className='flex items-center justify-between gap-x-3 '>
                        <Button className='w-1/2' variant={"custom_blue_outlined"} size="sm" onClick={() => {
                            router.back()
                        }} disabled={isSubmitting}>
                            {
                                isCreatePath ? "Cancel" : "Back"
                            }
                        </Button>
                        {
                            isCreatePath && (
                                <Button className='text-white w-1/2' size="sm" disabled={isSubmitting || !isValidToGenerate} onClick={handleCreateSnippet}>
                                    <Save className='size-5 mr-1' />
                                    Save
                                </Button>
                            )
                        }
                        {
                            isValidToGenerate && (
                                <Button className={cn('text-white ', isCreatePath && "w-1/2")} size="sm" disabled={isSubmitting} onClick={convertCanvasToImage}>
                                    <ArrowDownToLine className='size-5 mr-1' />
                                    Download
                                </Button>
                            )
                        }
                    </div>
                </div>
                {
                    isValidToGenerate ? (
                        <div id="snapShotImage" className={cn('w-auto h-auto', GradientsDetails[gradientKey])}>
                            <div className='w-auto h-auto flex items-center justify-center p-10'>
                                <div className='h-auto w-auto  flex flex-col bg-[#22272D] rounded-2xl overflow-hidden'>
                                    <div className='w-full h-12  bg-[#2F3439] p-3 flex items-center gap-x-2'>
                                        <span className=' block size-3 rounded-full bg-[#FF5F57]' />
                                        <span className=' block size-3 rounded-full bg-[#FEBC2E]' />
                                        <span className=' block size-3 rounded-full bg-[#27C840]' />
                                    </div>
                                    <div className='w-full h-auto p-5 text-xs'>
                                        {
                                            isValidToGenerate && (
                                                <SyntaxHighlighter language={selectedCodeSnippet.language} style={dracula} customStyle={{
                                                    backgroundColor: "#22272D"
                                                }}>
                                                    {dedent(selectedCodeSnippet.codeContent)}
                                                </SyntaxHighlighter>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='grow flex items-center justify-center'>
                            <span className='text-xl md:text-2xl lg:text-4xl xl:text-5xl font-semibold capitalize bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600'>Please select code-snippet</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SnapShotEditor