import Link from 'next/link'
import React from 'react'

const BrandingPage = () => {
    return (
        <div>
            Branding page
            <Link href="/main" className='text-white'>Main</Link>
        </div>
    )
}

export default BrandingPage