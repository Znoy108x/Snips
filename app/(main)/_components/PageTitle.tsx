"use client"
import React, { Fragment } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb"
import { usePathname } from 'next/navigation'

const PageTitle = ({ title }: { title: string }) => {

    const pathName = usePathname()
    const pathArr = pathName.split("/")

    return (
        <div className='space-y-3'>
            <Breadcrumb>
                <BreadcrumbList>
                    {
                        pathArr.map((path, index) => {
                            const pathName = path.split("-").join(" ")
                            return (
                                <Fragment key={index}>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={path}>{pathName}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                </Fragment>
                            )
                        })
                    }
                </BreadcrumbList>
            </Breadcrumb>
            <div
                className='font-bold text-cWhiteLight text-3xl'>
                {title}
            </div>
        </div>
    )
}

export default PageTitle

