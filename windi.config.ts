import { defineConfig } from 'windicss/helpers'

const fontSerif =
  'Georgia,Times New Roman,PMingLiu,STSong,SimSun,WenQuanYi Bitmap Song,Noto Serif CJK,serif'

const fontMono = 'JetBrainsMono,Source Code Pro,Monaco,Menlo,Consolas,Courier New,Courier,monospace'

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
        dark: {
          css: {
            pre: {
              backgroundColor: '#222'
            },
            a: {
              color: '#aaa'
            },
            blockQuote: {
              color: '#aaa'
            },
            p: {
              code: {
                backgroundColor: '#333'
              }
            }
          }
        },
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
              fontFamily: fontSerif
            },
            h2: {
              fontFamily: fontSerif
            },
            h3: {
              fontFamily: fontSerif
            },
            h4: {
              fontFamily: fontSerif
            },
            pre: {
              fontFamily: fontMono,
              paddingBottom: '.5rem',
              backgroundColor: '#f6f6f6',
              color: '#999'
            },
            a: {
              wordBreak: 'break-all',
              color: '#888'
            },
            blockQuote: {
              marginLeft: 'unset',
              color: '#888'
            },
            ul: {
              paddingLeft: 'unset'
            },
            ol: {
              paddingLeft: 'unset'
            },
            p: {
              code: {
                margin: '0 .25rem',
                padding: '0 .25rem',
                borderRadius: '.25rem',
                backgroundColor: '#eee'
              },
              'code:after': {
                content: 'unset'
              },
              'code:before': {
                content: 'unset'
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
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('windicss/plugin/typography')({
      dark: true
    })
  ]
})
