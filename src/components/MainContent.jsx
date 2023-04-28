import { getHome } from '@/sanity/sanity-utils';
import PortableText from '@sanity/block-content-to-react';
import React from 'react'
import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity';

const client = createClient({
   projectId: 'uf77088s',
   dataset: 'production',
   apiVersion: '2023-04-24',
   useCdn: true,
 })

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client)

function urlFor(source) {
  return builder.image(source)
}

const serializers = {
   types: {
      image: ({ node }) => {
         const { asset, alt } = node;
         if (!asset || !asset._ref) {
            return null;
         }
         return (
            <figure>
               <img src={ urlFor(node).url() } alt={alt} />
            </figure>
         );
      }
   },
   marks: {
      internalLink: ({mark, children}) => {
         
        const {slug = {}} = mark

        const href = `/${slug.current}`
        return <a href={href}>{children}</a>
      },
      link: ({mark, children}) => {
        const { blank, href } = mark
        console.log(blank)
        return blank ?
          <a href={href} target="_blank" rel="noopener">{children}</a>
          : <a href={href}>{children}</a>
      }
    }
}

const MainContent = () => {

   const [home, setHome] = React.useState(null);

   React.useEffect(() => {
      const fetchData = async () => {
         const data = await getHome()
         setHome(data);
      };
      fetchData();
   }, []);

   if (!home) {
      return <div className='loading'>Loading...</div>;
   }

   return (
      <>
         {<PortableText blocks={home[0].content} serializers={serializers} />}
      </>
   )
}

export default MainContent