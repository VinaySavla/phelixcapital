import './globals.css'

export const metadata = {
  title: 'Phelix Capital',
  description: 'Phelix Capital homepage'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
