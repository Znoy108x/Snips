"use client"
import React from 'react'
import { Button } from '@/shared/components/ui/button'
import { Code, SquareCode, SquareDashedBottomCode } from 'lucide-react'
import { useRouter } from 'next13-progressbar'
import { usePathname } from 'next/navigation'

const Sidebar = () => {

    const router = useRouter()
    const pathName = usePathname()
    const sidebarRoutes = [
        {
            name: "Code Snippets",
            path: "/code-snippets",
            icon: <Code />
        },
        {
            name: "Snapshots",
            path: "/snap-shots",
            icon: <SquareCode />
        }
    ]

    return (
        <div className='w-full h-full border-r-[1px]  border-cborder'>
            <div className='flex flex-col gap-y-2 p-5'>
                {
                    sidebarRoutes.map((route) => {
                        const isActive = pathName.includes(route.path)
                        return (
                            <Button variant={isActive ? "custom_blue" : "custom_ghost"} key={route.path} onClick={() => {
                                router.push("/main" + route.path)
                            }}>
                                <div className='flex items-center gap-x-4 w-[200px] '>
                                    <span className=''>
                                        {route.icon}
                                    </span>
                                    <span className='font-semibold'>
                                        {route.name}
                                    </span>
                                </div>
                            </Button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar