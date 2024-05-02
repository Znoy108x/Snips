import React from 'react'
import prismadb from '@/shared/lib/prismaDb'
import { redirect } from 'next/navigation'
import EditorComp from '@/app/(main)/_components/EditorComp'
import { LangType, languageOptions } from '@/app/(main)/_components/drop-downs/langData'
import ShareEditorComp from './_component/ShareEditorComp'

const SharedSnippetPage = async ({ params: { snippetId } }: { params: { snippetId: string } }) => {

    if (!snippetId) {
        redirect("/")
    }

    const codeSnippet = snippetId ? await prismadb.codeSnippets.findUnique({
        where: {
            id: snippetId
        }
    }) : null

    const isNotValid = !codeSnippet || !codeSnippet.isPublished

    return (
        <div className='w-full h-full flex flex-col items-center justify-center bg-accent bg-[url("/pattern.svg")]'>
            {
                isNotValid ? (
                    <span className='text-xl md:text-2xl lg:text-4xl xl:text-5xl font-semibold capitalize bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600'>
                        Oops! Something Went Wrong
                    </span>
                ) : (
                    <ShareEditorComp data={codeSnippet} />
                )
            }
        </div>
    )
}

export default SharedSnippetPage