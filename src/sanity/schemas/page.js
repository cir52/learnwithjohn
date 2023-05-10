const pages = {
   name: 'page',
   type: 'document',
   title: 'Pages',
   fields: [
      {
         name: 'title',
         title: 'Title',
         type: 'string'
      },
      {
         name: 'slug',
         title: 'Slug',
         type: 'slug',
         options: {
            source: 'title',
            maxLength: 96
         }
      },
      {
         name: 'content',
         title: 'Content',
         type: 'array',
         of: [
            {
               type: 'block',
               marks: {
                  annotations: [
                     {
                        name: 'link',
                        type: 'object',
                        title: 'External link',
                        fields: [
                           {
                              name: 'href',
                              type: 'url',
                              title: 'URL'
                           },
                           {
                              title: 'Open in new tab',
                              name: 'blank',
                              type: 'boolean'
                           }
                        ]
                     },
                     {
                        name: 'internalLink',
                        type: 'object',
                        title: 'Internal link',
                        fields: [
                           {
                              name: 'reference',
                              type: 'reference',
                              title: 'Reference',
                              to: [
                                 { type: 'page' },
                              ]
                           }
                        ]
                     },
                     {
                        name: 'CustomStyle',
                        type: 'object',
                        title: 'Custom Style',
                        fields: [
                           {
                              name: 'customstyle',
                              type: 'string',
                              title: 'Custom CSS Styles',
                           }
                        ]
                     }
                  ]
               }
            },
            {
               type: 'image',
               fields: [
                  {
                     name: 'alt',
                     type: 'string',
                     title: 'Alternative text',
                     description: 'Important for SEO and accessiblity.',
                  },
                  {
                     name: 'width',
                     type: 'string',
                     title: 'Imagewidth',
                     description: 'Max width of the image as CSS (e.g. 200px / 2.0rem)',
                  },
               ],
            },
         ]
      },
      {
         name: 'tags',
         title: 'Tags',
         type: 'string',
         description: 'Enter tags separated by commas',
      },
      {
         name: 'parent',
         type: 'reference',
         to: [{ type: 'page' }],
         title: 'Parent',
      },
   ],
 };

 export default pages