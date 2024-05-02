import { Loader } from 'lucide-react'
import React from 'react'

const LoadingPage = () => {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <Loader className='animate-spin text-cblue size-5' />
        </div>
    )
}

export default LoadingPage