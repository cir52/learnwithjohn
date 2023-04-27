import { createClient, groq } from "next-sanity";


export async function getMenuStructure() {

   const client = createClient ({

      projectId: 'uf77088s',
      dataset: 'production',
      apiVersion: '2023-04-24',

   })

   return client.fetch(
      groq`
      *[_type == "page" && !defined(parent)] {
        _id,
        title,
        slug,
        "children": *[_type == "page" && references(^._id)] {
          _id,
          title,
          slug,
          "children": *[_type == "page" && references(^._id)] {
            _id,
            title,
            slug
          }
        }
      }
    `    
   )
}