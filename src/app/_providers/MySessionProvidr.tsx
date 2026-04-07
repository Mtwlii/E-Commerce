"use client"
import { SessionProvider } from 'next-auth/react'

export default function MySessionProvidr({ children }) {
    return (
        <>
            <SessionProvider>

                {children }
                
            </SessionProvider>
        </>
    )
}
