import { fileURLToPath } from 'url'
export default defineNuxtConfig({
  imports: {
    dirs: ['types'],
  },
  alias: {
    fdn: fileURLToPath(new URL('./types', import.meta.url)),
  },
})
