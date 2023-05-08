const { createClient } = require('@sanity/client');

module.exports = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2023-04-23',
  useCdn: process.env.NODE_ENV === 'production',
});