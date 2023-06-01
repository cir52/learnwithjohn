import pages from '@/sanity/schemas/page'
import home from '@/sanity/schemas/home'
import navbar from '@/sanity/schemas/navbar'
import socials from '@/sanity/schemas/socials'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'


const config = defineConfig({

  name: 'default',
  title: 'Sanity Admin',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,

  apiVersion: '2023-04-24',
  basePath: '/admin',

  plugins: [deskTool(), visionTool()],

  schema: { types: [pages, home, navbar, socials] },

})

export default config

