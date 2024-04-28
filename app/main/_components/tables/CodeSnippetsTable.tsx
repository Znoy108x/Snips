"use client"
import React from 'react'
import { CustomTable } from './CustomTable';
import { CodeSnippetTableColumn } from './columns/CodeSnippetColumns';
import { CodeSnippetDBDataType } from '@/shared/types/CodeSnippet.types';

const CodeSnippetsTable = ({ data }: { data: CodeSnippetDBDataType[] }) => {
    return (
        <CustomTable data={data} columns={CodeSnippetTableColumn} />
    )
}

export default CodeSnippetsTable