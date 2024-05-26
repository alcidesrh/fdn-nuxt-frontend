// apollo.config.js
module.exports = {
  client: {
    service: {
      name: 'FDN',
      // URL to the GraphQL API
      url: 'https://localhost/graphql',
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'],
  },
}
