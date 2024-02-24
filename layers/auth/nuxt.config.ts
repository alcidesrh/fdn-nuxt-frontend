// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))

// This code is demo only.
if (!process.env.NUXT_AUTH_PASSWORD) {
  console.warn('Security warning: NUXT_AUTH_PASSWORD is not set. Using an example value. Please set it otherwise your session is unsecure!')
  process.env.NUXT_AUTH_PASSWORD = 'secretsecretsecretsecretsecretsecretsecret'
}

export default defineNuxtConfig({
  runtimeConfig: {
    auth: {
      name: 'nuxt-session',
      password: process.env.NUXT_AUTH_PASSWORD || '',
    },

  },
  hooks: {
    'pages:extend': function (pages) {
      function setMiddleware(pages) {
        for (const page of pages) {
          if (!['Login', 'Test'].includes(page.name)) {
            page.meta ||= {}
            // Note that this will override any middleware set in `definePageMeta` in the page
            page.meta.auth = true
          }
          else {

          }
          if (page.children)
            setMiddleware(page.children)
        }
      }
      setMiddleware(pages)
    },
  },

  alias: {
    login_schema: join(currentDir, './components/form/schemas'),
    api: fileURLToPath(new URL('./layers/api', import.meta.url)),
  },

  imports: {
    dirs: [
      'stores'
    ]
  },

})
