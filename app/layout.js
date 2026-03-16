import './globals.css'

export const metadata = {
  title: 'OG Intelligence Hub',
  description: 'OpenGradient Ecosystem Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="animated-gradient">
        <div className="bg-grid" />
        {children}
      </body>
    </html>
  )
}
