// apollo.config.js
module.exports = {
    client: {
        service: {
            name: 'FDN',
            // URL to the GraphQL API
            url: 'http://localhost/graphql'
        },
        // Files processed by the extension
        includes: ['./**/*.vue', './**/*.js', './**/*.ts']
    }
};
