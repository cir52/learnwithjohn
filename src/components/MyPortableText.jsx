import PortableText from '@sanity/block-content-to-react';
import React from 'react'
import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity';
import Link from 'next/link'

const MyPortableText = ( {blocks} ) => {

   const client = createClient({
      projectId: 'uf77088s',
      dataset: 'production',
      apiVersion: '2023-04-24',
      useCdn: true,
   })

   // Get a pre-configured url-builder from the sanity client
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
                  <img src={urlFor(node).url()} alt={alt} />
               </figure>
            );
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