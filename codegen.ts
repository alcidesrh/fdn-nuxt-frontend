import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: './graphql/documents/schema.graphql',
    // schema: 'http://localhost/schema.graphql',
    generates: {
        './graphql/': {
            documents: ['./pages/**/*.{vue,js,ts}', './components/**/*.{vue,js,ts}', './composables/**/*.{vue,js,ts}'],
            preset: 'client',
            presetConfig: {
                gqlTagName: 'gql'
            },
            config: {
                useTypeImports: true
            }
        },
        'graphql/queries.ts': {
            documents: ['./graphql/documents/*.graphql'],

            plugins: ['typescript-document-nodes'],
            config: {
                // namePrefix: 'gql',
                namingConvention: 'keep'
            }
        }
    },
    ignoreNoDocuments: true,
    hooks: { afterAllFileWrite: ['prettier --write'] }
};

export default config;
