import Navbar from '@/components/Navbar'
import { useRouter } from 'next/router'
import HomePage from '@/components/HomePage'
import ContentPage from '@/components/ContentPage'
import Search from '@/components/Search'
import Sidebar from '@/components/Sidebar'
import { useState } from 'react'
import BlurBackground from '@/components/tools/BlurBackground'
import LoginPage from '@/components/LoginPage'
import { signOut, useSession } from 'next-auth/react'

export default function Home() {

  const { data: session } = useSession()
  const expiredSession = session && new Date(session.expires) < new Date()

  const [isSidebarVisible, setIsSidebarVisible] = useState(false)
  const [showLoginPage, setShowLoginPage] = useState(false) 

  const handleToggleSidebar = (visible) => {
    setIsSidebarVisible(visible)
  }

  const handleToggleLoginPage = (visible, expiredSession = false) => {
    setShowLoginPage(visible)
  }

  const router = useRouter()
  const path = router.asPath

  const searchRegex = /^\/search(\/.*)?$/
  const searchMatch = path.match(searchRegex)

  return (
    <>
    <div className='flex'>
      <BlurBackground blur = {showLoginPage}>
        <Navbar 
            onToggleSidebar = {handleToggleSidebar} 
            onToggleLoginPage = {handleToggleLoginPage} 
            session = { session}
        />
        <div 
            className={`content w-full absolute top-[4.5rem] pt-[0.75rem] mx-0 md:mx-0 md:px-3 flex justify-start`}
        >
          <div
            className={`sidebar md:max-w-[30%] lg:max-w-[25%] transform-gpu transition-all duration-300 ease-in-out md:!translate-x-0 md:!w-fit md:!overflow-visible md:!opacity-100 ${isSidebarVisible ? 'translate-x-0 w-full overflow-visible opacity-100' : '-translate-x-full w-0 overflow-auto opacity-0'} md:translate-x-0 md:block`}
          >
            <Sidebar />
          </div>
          <div>
            {path === '/' ? (
              <HomePage />
            ) : searchMatch ? (
              <Search query={searchMatch[1]} />
            ) : (
              <ContentPage />
            )}
          </div>
        </div>
      </BlurBackground>
      
      {showLoginPage && (
        <div className = "fixed inset-0 bg-blue-100 bg-opacity-50 flex items-center justify-center">          
          <LoginPage 
              expiredSession = {expiredSession}
              onClose={() => setShowLoginPage(false)} 
          />
        </div>
      )}
      </div>
    </>
  )
}