import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/components/modal-provider'
import { ToasterProvider } from './api/toaster-provider'
// import { CrispProvider } from '@/components/crisp-provider'

const inter = Inter({ subsets: ['latin'] })
const manrope = Manrope({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'TeAIcher',
  description: 'TeAIcher - An app providing multiple choices generated by ai for teachers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* <CrispProvider /> */}
        <body className={manrope.className} suppressHydrationWarning={true}>
          <ModalProvider />
          <ToasterProvider />
          {children}
          </body>
      </html>
    </ClerkProvider>
  )
}
