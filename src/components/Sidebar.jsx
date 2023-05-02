import React, { useState, useContext, useEffect  } from 'react'
import { AiOutlineMenu} from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { getMenuStructure } from '@/sanity/sanity-utils'
import Menu from './Menu'
import { SanityContext } from '@/sanity/SanityContextProvider'
import { Sidenav, initTE } from "tw-elements"

const Sidebar = () => {

  useEffect(() => {
    initTE({ Sidenav })
  }, []);

  const client = useContext(SanityContext);

  const [items, setItems] = React.useState(null);
  const [showSidebar, setShowSidebar] = useState(true)
  
  // useEffect to check if menu is fetched and ready for rendering
  React.useEffect(() => {
     const fetchData = async () => {
        const data = await getMenuStructure(client)
        setItems(data);
     };
     fetchData();
  }, []);


  return (
    <div className='sidebar h-[92vh] overflow:hidden xl:hover:overflow-auto'>
      <div className = 'block xl:hidden ml-4 text-xl'
           onClick = {() => setShowSidebar((value) => !value)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu /> }
      </div>
      {
        showSidebar && (
          <div  className = 'xl:w-400 w-20 flex flex-col justify-start border-r-2 border-gray-100 xl:border-0 p-3'>
              <Menu items={items} />
          </div>
        )
      }
    </div>
  )
}

export default Sidebar