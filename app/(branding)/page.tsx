import Link from 'next/link'
import React from 'react'

const BrandingPage = () => {
    return (
        <div>
            Branding page
            <Link href="/code-snippets" className='text-white'>Main</Link>
        </div>
    )
}

export default BrandingPage