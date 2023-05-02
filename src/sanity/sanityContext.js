import { createClient } from "next-sanity";

const sanityClient = createClient({
  projectId: 'uf77088s',
  dataset: 'production',
  apiVersion: '2023-04-24',
  useCdn: true,
})

export { sanityClient }