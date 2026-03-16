import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OG Intelligence Hub',
  description: 'OpenGradient Ecosystem — BitQuant + Model Hub',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} animated-gradient`}>
        <div className="bg-grid" />
        {children}
      </body>
    </html>
  )
}
