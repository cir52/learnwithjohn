import PortableText from '@sanity/block-content-to-react'
import React, { useContext } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import Link from 'next/link'
import { SanityContext } from '@/sanity/SanityContextProvider'

const MyPortableText = ( {blocks} ) => {

   const client = useContext(SanityContext)

   // Get a pre-configured url-builder from the sanity client
   const builder = imageUrlBuilder(client)

   function urlFor(source) {
      return builder.image(source)
   }

   const serializers = {
      types: {
         image: ({ node }) => {
            const { asset, alt, width } = node;
            if (!asset || !asset._ref) {
               return null;
            }
            return (
               <figure>
                  <img src={urlFor(node).url()} alt={alt} width={width}/>
               </figure>
            )
         }
      },
      marks: {
         internalLink: ({ mark, children }) => {
            const { slug = {} } = mark
            const href = `/${slug.current}`
            return <Link href={href}>{children}</Link>
         },
         link: ({ mark, children }) => {
            const { blank, href } = mark
            return blank ?
               <Link href={href} target="_blank" rel="noopener">{children}</Link>
               : <Link href={href}>{children}</Link>
         },
         CustomStyle: ({ mark, children }) => {
            const { customstyle } = mark
            const styles = customstyle.split(';').reduce((acc, style) => {
              const [property, value] = style.split(':')
              if (property && value) {
                acc[property.trim()] = value.trim()
              }
              return acc
            }, {})
          
            return <span style={styles}>{children}</span>
         }  
      }
   }

  return (
   <>
      <PortableText blocks={blocks} serializers={serializers} />
   </>
  )
}

export default MyPortableText