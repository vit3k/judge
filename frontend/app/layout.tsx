import './globals.css'
import { Inter } from 'next/font/google'
import Provider from './components/Provider'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';
import ProfileMenu from './components/ProfileMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Online judge',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <header className="justify-between text-lg font-mono font-bold p-4 pl-8 bg-black text-gray-100 flex">
            <h1 className=''>Online judge</h1>
            <div><ProfileMenu session={session}/></div>
          </header>
          {children}
        </Provider>
      </body>
    </html>
  )
}
