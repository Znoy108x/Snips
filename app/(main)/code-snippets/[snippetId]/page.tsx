import React from 'react'
import { CodeSnippetEdit } from './_components/CodeSnippetEdit'
import prismadb from '@/shared/lib/prismaDb'
import { CodeSnippetDBDataType } from '@/shared/types/CodeSnippet.types'

const SnippetIdPage = async ({ params: { snippetId } }: { params: { snippetId: string } }) => {

    const isCreateSnippetPage = snippetId === "new-snippet"
    const codeSnippetDataById: CodeSnippetDBDataType | null = isCreateSnippetPage ? null : await prismadb.codeSnippets.findUnique({
        where: {
            id: snippetId
        }
    })

    return (
        <CodeSnippetEdit data={codeSnippetDataById} />
    )
}

export default SnippetIdPage