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
            { type: 'block' },
            { type: 'image' }
         ]
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