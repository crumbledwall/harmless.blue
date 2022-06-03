import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Roboto',
          'Helvetica',
          'Tahoma',
          'Arial',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'WenQuanYi Micro Hei',
          'Noto Sans CJK',
          'sans-serif'
        ],
        serif: [
          'Georgia',
          'Times New Roman',
          'PMingLiu',
          'STSong',
          'SimSun',
          'WenQuanYi Bitmap Song',
          'Noto Serif CJK',
          'serif'
        ],
        monospace: [
          'JetBrainsMono',
          'Source Code Pro',
          'Monaco',
          'Menlo',
          'Consolas',
          'Courier New',
          'Courier',
          'monospace'
        ]
      },
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
            },
            h1: {
              fontFamily:
                'Georgia,Times New Roman,PMingLiu,STSong,SimSun,WenQuanYi Bitmap Song,Noto Serif CJK,serif'
            },
            h2: {
              fontFamily:
                'Georgia,Times New Roman,PMingLiu,STSong,SimSun,WenQuanYi Bitmap Song,Noto Serif CJK,serif'
            },
            h3: {
              fontFamily:
                'Georgia,Times New Roman,PMingLiu,STSong,SimSun,WenQuanYi Bitmap Song,Noto Serif CJK,serif'
            },
            h4: {
              fontFamily:
                'Georgia,Times New Roman,PMingLiu,STSong,SimSun,WenQuanYi Bitmap Song,Noto Serif CJK,serif'
            },
            pre: {
              fontFamily:
                'JetBrainsMono,Source Code Pro,Monaco,Menlo,Consolas,Courier New,Courier,monospace'
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
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('windicss/plugin/typography')({
      dark: true
    })
  ]
})
