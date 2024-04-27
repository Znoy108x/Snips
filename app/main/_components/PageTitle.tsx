import React from 'react'

const PageTitle = ({ title }: { title: string }) => {
    return (
        <div>
            <span className='font-bold text-cWhiteLight text-3xl'>
                {title}
            </span>
        </div>
    )
}

export default PageTitle