
import Navbar from '@/components/Navbar'

import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import HomePage from '@/components/HomePage'
import ContentPage from '@/components/ContentPage'
import Search from '@/components/Search'
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("@/components/Sidebar"), { ssr: false });


const inter = Inter({ subsets: ['latin'] })

export default function Home() {



    
  const router = useRouter()
  const path = router.asPath

  const searchRegex = /^\/search(\/.*)?$/
  const searchMatch = path.match(searchRegex)

  return (
    <div>
      <Navbar />
      <div className="mt-[6rem] flex gap-6 md:gap-20">
        <Sidebar />
        <main className="flex min-h-screen flex-col items-center justify-between p-4">
          <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            {path === '/' ? <HomePage /> : 
              searchMatch ? <Search query = {searchMatch[1]} /> : <ContentPage />}
          </div>
        </main>
      </div>
    </div>
  )
}
