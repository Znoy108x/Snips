"use client"
import React from 'react'
import { CustomTable } from './CustomTable';
import { SnapShotWithSnippet } from '@/shared/types/CodeSnippet.types';
import { CodeSnapShotColumns } from './columns/CodeSnapShotColumns';
import { useCodeSnippetContext } from '@/shared/context/CodeSnippetContext';

const SnapShotTable = ({ data }: { data: SnapShotWithSnippet[] }) => {

    return (
        <CustomTable data={data} columns={CodeSnapShotColumns} />
    )
}

export default SnapShotTable