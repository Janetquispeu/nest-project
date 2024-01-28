export default () => ({
  appName: 'blog',
  http: {
    port: parseInt(process.env.PORT, 10) || 3000,
    host: process.env.HOST || '0.0.0.0',
  },
  db: {
    uri: process.env.MONGODB_URI
  },
});
