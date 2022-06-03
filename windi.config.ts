import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            img: {
              width: '100%'
            },
            blockquote: {
              p: {
                whiteSpace: 'pre-line'
              }
            }
          }
        }
      }
    }
  },
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next']
  },
  plugins: [require('windicss/plugin/typography')]
})
