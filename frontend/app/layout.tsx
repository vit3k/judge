import './globals.css'
import { Inter } from 'next/font/google'
import Provider from './components/Provider'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Online judge',
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  )
}
