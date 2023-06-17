import Navbar from '@/components/Navbar'
import { useRouter } from 'next/router'
import HomePage from '@/components/HomePage'
import ContentPage from '@/components/ContentPage'
import { useEffect, useState, useContext } from 'react'
import BlurBackground from '@/components/tools/BlurBackground'
import LoginPage from '@/components/LoginPage'
import { signOut, useSession } from 'next-auth/react'
import Search from '@/components/Search'
import { sanityClient } from '@/sanity/sanityContext'
import { getContentPage, getHome, getNavbarSocials, getNavbarMenu, getMenuStructure } from '@/sanity/sanity-utils'
import Menu from '@/components/Menu'

export default function Home({ pageData, homeData, navbarSocialsData, navbarMenuData, menuData }) {

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

  useEffect(() => {
    handleToggleSidebar(false)
  }, [path])

  return (
    <>
      <div className='gradient' />
      <div className='flex'>
        <BlurBackground blur={showLoginPage}>
          <Navbar
            onToggleSidebar={handleToggleSidebar}
            onToggleLoginPage={handleToggleLoginPage}
            isSidebarVisible={isSidebarVisible}
            session={session}
            navbarSocialsData={navbarSocialsData}
            navbarMenuData={navbarMenuData}
          />
          <div
            className={`content w-full absolute top-[4.5rem] pt-[0.75rem] mx-0 md:mx-0 md:px-3 flex justify-start`}
          >
            <div
              className={`sidebar md:max-w-[30%] lg:max-w-[25%] transform-gpu transition-all duration-300 ease-in-out md:!translate-x-0 md:!w-fit md:!overflow-visible md:!opacity-100 ${isSidebarVisible ? 'translate-x-0 w-full overflow-visible opacity-100' : '-translate-x-full w-0 overflow-auto opacity-0'} md:translate-x-0 md:block`}
            >
              <Menu menuData={menuData} navbarSocialsData={navbarSocialsData} />
            </div>
            <div className={`${isSidebarVisible ? 'hidden w-0' : 'w-auto'} md:!w-auto`}>
              {path === '/' ? (
                <HomePage homeData={homeData} />
              ) : searchMatch ? (
                <Search query={searchMatch[1]} />
              ) : (
                <ContentPage pageData={pageData} />
              )}
            </div>
          </div>
        </BlurBackground>

        {showLoginPage && (
          <div className="fixed inset-0 bg-blue-100 bg-opacity-50 flex items-center justify-center">
            <LoginPage
              expiredSession={expiredSession}
              onClose={() => setShowLoginPage(false)}
            />
          </div>
        )}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {

  const { index } = context.query;

  let slug;
  let pageData = null;
  let homeData = null;

  let navbarSocialsData = await getNavbarSocials(sanityClient) || null;
  let navbarMenuData = await getNavbarMenu(sanityClient) || null;
  let menuData = await getMenuStructure(sanityClient)

  // Check if index is defined
  if (index) {
    const indexCopy = [...index];
    slug = indexCopy.pop();
    pageData = await getContentPage({ client: sanityClient, slug: slug })
  } else {
    homeData = await getHome(sanityClient)
  }

  return {
    props: {
      pageData: pageData,
      homeData: homeData,
      navbarSocialsData: navbarSocialsData,
      navbarMenuData: navbarMenuData,
      menuData: menuData,
      path: context.resolvedUrl
    },
  }
}