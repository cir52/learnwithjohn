import pages from '@/sanity/schemas/page'
import home from '@/sanity/schemas/home'
import navbar from '@/sanity/schemas/navbar'
import socials from '@/sanity/schemas/socials'
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'



const config = defineConfig({

  name: 'default',
  title: 'Sanity Admin',

  projectId: 'uf77088s',
  dataset: 'production',

  apiVersion: '2023-04-24',
  basePath: '/admin',

  plugins: [deskTool()],

  schema: { types: [pages, home, navbar, socials] },

})

export default config

