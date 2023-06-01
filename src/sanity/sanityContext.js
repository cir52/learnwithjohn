import { createClient } from 'next-sanity'

const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-22'

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const useCdn = true;
const token = process.env.NEXT_PUBLIC_SANITY_TOKEN;

export const sanityClient = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token
})
