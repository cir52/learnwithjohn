import Navbar from '@/components/Navbar'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import HomePage from '@/components/HomePage'
import ContentPage from '@/components/ContentPage'
import Search from '@/components/Search'
import Sidebar from '@/components/Sidebar'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [isSidebarVisible, setIsSidebarVisible] = useState(false)

  const handleToggleSidebar = (visible) => {
    setIsSidebarVisible(visible)
  }

  const router = useRouter()
  const path = router.asPath

  const searchRegex = /^\/search(\/.*)?$/
  const searchMatch = path.match(searchRegex)

  return (
    <>
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <div className={`mt-[5.25rem] mx-0 md:mx-3 flex justify-start`}>
        <div
          className={`sidebar md:max-w-[30%] lg:max-w-[20%] transform-gpu transition-all duration-300 ease-in-out 
          md:!translate-x-0 md:!w-fit md:!overflow-visible md:!opacity-100          
          ${isSidebarVisible ? 'translate-x-0 w-full overflow-visible opacity-100' : '-translate-x-full w-0 overflow-auto opacity-0'
            } md:translate-x-0 md:block`}
        >
          <Sidebar />
        </div>
        <div className="mx-5 md:mx-10">
          {path === '/' ? (
            <HomePage />
          ) : searchMatch ? (
            <Search query={searchMatch[1]} />
          ) : (
            <ContentPage />
          )}
        </div>
      </div>
    </>
  )
}