import PortableText from '@sanity/block-content-to-react'
import React from 'react'
import imageUrlBuilder from '@sanity/image-url'
import Link from 'next/link'
import SanityBlockContent from '@sanity/block-content-to-react'
import { sanityClient } from '@/sanity/sanityContext'

const createValidId = (text) => {
   return text
     .toLowerCase()
     .replace(/&/g, 'and') // Replace & with 'and'
     .replace(/[^a-z0-9]+/g, '-') // Replace any other special characters with hyphens
     .replace(/^-|-$/g, '') // Remove any leading or trailing hyphens
 }

const MyPortableText = ( {blocks} ) => {

   // Get a pre-configured url-builder from the sanity client
   const builder = imageUrlBuilder(sanityClient)

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
         },
         block: (props) => {
            // give h1 an ID for the page content menu
            if (props.node.style === 'h1') {
               const id = createValidId(props.node.children[0]?.text)
               return <h1 id={id}>{props.children}</h1>
            } else {
               // Fallback for other block types
               return SanityBlockContent.defaultSerializers.types.block(props)
             }
         },
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
   <div className='main-content'>
      <PortableText blocks={blocks} serializers={serializers} />
   </div>
  )
}

export default MyPortableText