
import Navbar from '@/components/Navbar'

import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import HomePage from '@/components/HomePage'
import ContentPage from '@/components/ContentPage'
import Search from '@/components/Search'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    
  const router = useRouter()
  const path = router.asPath

  const searchRegex = /^\/search(\/.*)?$/
  const searchMatch = path.match(searchRegex)

  return (
    <>
      <Navbar />
      <div className='mt-[6.5rem] flex justify-between gap-10'>
          <Sidebar />

          {path === '/' ? <HomePage /> :
            searchMatch ? <Search query={searchMatch[1]} /> : <ContentPage />}
      </div>
    </>
  )
}
