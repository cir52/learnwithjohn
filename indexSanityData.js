require('dotenv').config({ path: '.env' });
const sanityClient = require('./sanityClient');
const algoliaIndex = require('./algoliaClient');

console.log('Sanity Project ID:', process.env.SANITY_PROJECT_ID); // Add this line to check if the environment variable is loaded correctly


const fetchSanityData = async () => {

   const query = `*[_type == 'page']{
     _id,
     title,
     'slug': slug.current,
     content[]{
       ...,
       _type == 'image' => {
         'alt': alt,
         'imageUrl': asset->url
       }
     }
   }`;
 
   const sanityData = await sanityClient.fetch(query);
 
   const processedData = sanityData.map((page) => ({
     ...page,
     content: page.content.map((contentItem) => {
       if (contentItem._type === 'block') {
         const text = contentItem.children
           ? contentItem.children.map((child) => child.text).join(' ')
           : '';
         return { text };
       }
       return contentItem;
     }),
   }));
 
   return processedData;
 };

const indexData = async () => {
  const sanityData = await fetchSanityData();
  const algoliaRecords = sanityData.map((item) => ({
    objectID: item._id,
    ...item,
  }));

  try {
    await algoliaIndex.saveObjects(algoliaRecords);
    console.log('Sanity data indexed in Algolia successfully');
  } catch (error) {
    console.error('Error indexing Sanity data in Algolia:', error);
  }
};

indexData();