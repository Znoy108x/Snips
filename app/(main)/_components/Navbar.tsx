import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
    return (
        <div className='absolute top-0 left-0 w-full  flex items-end pb-3 justify-between h-16 px-10 shadow-sm border-b-[1px] border-b-cborder'>
            <Link href="/main" className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 cursor-pointer flex items-center gap-x-3' >
                Snips
            </Link>
            <div className='flex items-center gap-x-5'>
                <UserButton afterSignOutUrl='/sign-in' />
            </div>
        </div>
    )
}

export default Navbar