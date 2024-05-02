import prismadb from '@/shared/lib/prismaDb'
import { SnapShotWithSnippet } from '@/shared/types/CodeSnippet.types'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import SnapShotEditor from './_components/SnapShotEditor'

const SnapShotIdPage = async ({ params: { snapShotId } }: { params: { snapShotId: string } }) => {

    const { userId } = auth()
    if (!userId) {
        redirect("/sign-in")
    }

    const isCreatePath = snapShotId === "new-snap-shot"

    const snapShotById: SnapShotWithSnippet | null = isCreatePath ? null : await prismadb.snapShot.findUnique({
        where: {
            id: snapShotId
        },
        include: {
            codeSnippet: true
        }
    })


    return (
        <SnapShotEditor data={snapShotById} isCreatePath={isCreatePath} />
    )
}

export default SnapShotIdPage