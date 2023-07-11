const pages = {
   name: 'page',
   type: 'document',
   title: 'Pages',
   fields: [
      {
         name: 'pagetitle',
         title: 'PageTitle',
         type: 'string',
         description: 'Shown in Browser and SE.',
      },
      {
         name: 'title',
         title: 'Title',
         type: 'string',
         description: 'Shown in Menu.',
      },
      {
         name: 'pagedescription',
         title: 'HTML Description',
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
               styles: [
                  { title: 'HMTL Code', value: 'html' },
                  { title: 'Heading 1', value: 'h1' },
                  { title: 'Heading 2', value: 'h2' },
                  { title: 'Heading 3', value: 'h3' }                  
                ],
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
                              description : 'see https://www.w3schools.com/jsref/dom_obj_style.asp for available styles',
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