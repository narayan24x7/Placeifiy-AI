/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_VubQ35igUOdW@ep-quiet-morning-a8tdqoif-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require'
    },
};