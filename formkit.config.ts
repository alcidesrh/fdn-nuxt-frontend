import { defineFormKitConfig } from '@formkit/vue'
import { genesisIcons } from '@formkit/icons'
import { es } from '@formkit/i18n'
import { rootClasses } from './formkit.theme'

export default defineFormKitConfig({
  locale: 'es',
  locales: { es },
  icons: { ...genesisIcons },
  config: {
    rootClasses,
  },
})
