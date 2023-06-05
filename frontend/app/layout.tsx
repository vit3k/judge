import './globals.css'
import { Inter } from 'next/font/google'
import Provider from '../components/Provider'
import Header from '../components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Online judge',
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {

  return (
    <html lang="pl">
      <body className={`${inter.className} h-screen text-white bg-gray-700`}>
        <Provider>
          <div className='h-full'>
            <Header />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  )
}
