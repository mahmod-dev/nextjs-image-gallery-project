import 'bootstrap/dist/css/bootstrap.min.css';

import './globals.css'
import { Inter } from 'next/font/google'
import { SSRProvider, Container } from '@/components/bootstrap';
import NavBar from './NavBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SSRProvider>
          <NavBar/>
          <main>
            <Container className='py-4'>
              {children}
            </Container>
          </main>

        </SSRProvider>
      </body>
    </html>
  )
}
