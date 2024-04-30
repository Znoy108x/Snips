"use client"
import React from 'react'
import { CustomTable } from './CustomTable';
import { CodeSnippetTableColumn } from './columns/CodeSnippetColumns';
import { SnapShotWithSnippet } from '@/shared/types/CodeSnippet.types';
import { CodeSnapShotColumns } from './columns/CodeSnapShotColumns';

const SnapShotTable = ({ data }: { data: SnapShotWithSnippet[] }) => {
    return (
        <CustomTable data={data} columns={CodeSnapShotColumns} />
    )
}

export default SnapShotTable