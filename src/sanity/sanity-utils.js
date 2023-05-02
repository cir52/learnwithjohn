import { groq } from "next-sanity";
import { useContext } from "react";
import { SanityContext } from "./SanityContextProvider";

export async function getNavbarMenu(client) {
  
  return client.fetch(
    groq`
      *[_type == "navbar"] {
        _id,
        title,
        slug
      }
    `
  )
}

export async function getNavbarSocials(client) {
  
  return client.fetch(
    groq`
      *[_type == "social"] {
        _id,
        title,
        icon,
        link
      }
    `
  )
}

export async function getMenuStructure(client) {

  return client.fetch(
    groq`
      *[_type == "page" && !defined(parent)] {
        _id,
        title,
        slug,
        "children": *[_type == "page" && references(^._id) && parent._ref == ^._id] {
          _id,
          title,
          slug,
          "children": *[_type == "page" && references(^._id) && parent._ref == ^._id] {
            _id,
            title,
            slug
          }
        }
      }
    `
  )
}

export async function getHome(client) {

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

export async function getContentPage({client, slug}) {

  return client.fetch(
    groq`
     *[(_type == "page" || _type == "navbar") && slug.current == $slug][0] {
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
   `,
    { slug }
  )
}