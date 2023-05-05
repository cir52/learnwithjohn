import React, { useState, useContext, useEffect } from 'react'
import { getMenuStructure } from '@/sanity/sanity-utils'
import { SanityContext } from '@/sanity/SanityContextProvider'
import Menu from './Menu';

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
