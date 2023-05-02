
const socials = {
   name: "social",
   type: "document",
   title: "Social Links",
   fields: [
      {
         name: "name",
         type: "string",
         title: "Name",
         description: "Enter the name of the social media platform"
      },
      {
         name: "icon",
         type: "string",
         title: "IconName",
         description: "Select IconName from : https://react-icons.github.io/react-icons/icons?name=fa",
      },
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
      }
   ]
}

export default socials

// const socials = {
//    name: 'page',
//    type: 'document',
//    title: 'Socials',
//    fields: [
//       {
//          name: 'title',
//          title: 'Title',
//          type: 'string'
//       },
//       {
//          name: 'link',
//          type: 'object',
//          title: 'External link',
//          fields: [
//             {
//                name: 'href',
//                type: 'url',
//                title: 'URL'
//             },
//             {
//                title: 'Open in new tab',
//                name: 'blank',
//                type: 'boolean'
//             }
//          ]
//       },
//       {
//          name: 'image',
//          type: 'image',
//          fields: [
//             {
//                name: 'alt',
//                type: 'string',
//                title: 'Alternative text',
//                description: 'Important for SEO and accessiblity.',
//             },
//          ],
//       }
//    ]
// }

// export default socials