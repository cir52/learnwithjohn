
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';

import HomePage from '@/components/HomePage';
import ContentPage from '@/components/ContentPage';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const path = router.asPath;

  return (
    <div>
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className="h-[92vh] overflow:hidden xl:hover:overflow-auto">
          <Sidebar />
        </div>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            { path === '/' ? <HomePage /> : <ContentPage /> }
          </div>
        </main>
      </div>
    </div>
  )
}
