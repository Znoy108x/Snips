"use client"
import React from 'react'
import { ThemeProvider } from './ThemeProvider'
import Next13ProgressBar from 'next13-progressbar'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange>
                {children}
            </ThemeProvider>
            <Next13ProgressBar height="4px" color="#4C9CFF" options={{ showSpinner: true }} showOnShallow />
        </>
    )
}

export default Providers