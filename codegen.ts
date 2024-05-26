import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './schema.graphql',
  documents: ['./pages/**/*.{vue,js,ts}', './components/**/*.{vue,js,ts}', './composab;es/**/*.{vue,js,ts}'],
  generates: {
    './graphql/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {
        useTypeImports: false,
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
