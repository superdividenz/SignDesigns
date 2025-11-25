import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '../components/ClientLayout'

export const metadata: Metadata = {
  title: 'Sign Designs',
  description: 'Product catalog for vinyl/signs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}