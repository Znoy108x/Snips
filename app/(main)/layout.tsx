import React from 'react'
import Navbar from './_components/Navbar'
import Sidebar from './_components/Sidebar'

const MainAppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='relative h-full w-full overflow-hidden flex flex-col max-w-[1600px]  mx-auto'>
            <Navbar />
            <div className='w-full h-full pt-16  flex'>
                <div className='lg:w-[260px]  hidden lg:block '>
                    <Sidebar />
                </div>
                <div className='w-full h-full overflow-y-auto'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MainAppLayout