import { createClient, groq } from "next-sanity";

export async function getMenuStructure() {

  const client = createClient({
    projectId: 'uf77088s',
    dataset: 'production',
    apiVersion: '2023-04-24',
    useCdn: true,
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

export async function getHome() {

  const client = createClient({
    projectId: 'uf77088s',
    dataset: 'production',
    apiVersion: '2023-04-24',
    useCdn: true,
  })

  return client.fetch(
    groq`
     *[_type == "home"] {
       _id,
       title,
       content[]{
        ...,
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "slug": @.reference->slug
          }
        }
      }
     }
   `
  )
}