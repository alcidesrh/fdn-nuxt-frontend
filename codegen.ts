import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './graphql/schema.graphql',
  documents: ['./pages/**/*.{vue,js,ts}', './components/**/*.{vue,js,ts}', './composab;es/**/*.{vue,js,ts}'],
  generates: {
    './graphql/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {
        useTypeImports: true,
      },
    },
  },
  ignoreNoDocuments: true,
  hooks: { afterAllFileWrite: ['prettier --write'] },
}

export default config
