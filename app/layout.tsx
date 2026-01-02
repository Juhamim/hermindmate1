import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'HerMindmate - Your Companion in Healing & Growth',
    description: 'Compassionate, accessible, and culturally sensitive mental health support for women from adolescents to elders.',
    icons: {
        icon: '/icon.png',
        shortcut: '/icon.png',
        apple: '/icon.png',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/icon.png" type="image/png" />
                <link rel="apple-touch-icon" href="/icon.png" />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    )
}
