import React, { useState, useContext, useEffect } from 'react'
import { getMenuStructure } from '@/sanity/sanity-utils'
// import dynamic from "next/dynamic";
import { SanityContext } from '@/sanity/SanityContextProvider'
import Menu from './Menu';

// const DynamicMenu = dynamic(() => import("./Menu"), { ssr: false });

const Sidebar = () => {

  const client = useContext(SanityContext);
  const [items, setItems] = React.useState(null);

  // useEffect to check if menu is fetched and ready for rendering
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getMenuStructure(client)
      setItems(data);
    };
    fetchData();
  }, []);


  return (
    <Menu items={items} />
  )
}

export default Sidebar