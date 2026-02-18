/** @type {import('tailwindcss').Config} */

const serifStack =
  "var(--font-serif), Georgia, 'Times New Roman', serif"
const monoStack =
  "var(--font-mono), 'Fira Code', 'Source Code Pro', Menlo, Monaco, Consolas, var(--font-sans), monospace"

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        border: 'border',
        decoration: 'text-decoration-color',
      },
      fontFamily: {
        sans: [
          'var(--font-sans)',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'sans-serif',
        ],
        serif: [
          'var(--font-serif)',
          'Georgia',
          'Times New Roman',
          'serif',
        ],
        monospace: [
          'var(--font-mono)',
          'Fira Code',
          'Source Code Pro',
          'Menlo',
          'Monaco',
          'Consolas',
          'var(--font-sans)',
          'monospace',
        ],
      },
      colors: {
        dark: {
          50:  '#edf0ef',
          100: '#d8dddb',
          200: '#b8c0bd',
          300: '#929c98',
          400: '#6e7a76',
          500: '#535e5a',
          600: '#3e4846',
          700: '#323b39',
          800: '#272e2d',
          900: '#222222',
        },
        light: {
          50:  '#f9fbfa',
          100: '#f4f7f6',
          200: '#e5ebe9',
          300: '#d1dad7',
          400: '#9ca8a3',
          500: '#6d7a75',
          600: '#505c58',
          700: '#3a4542',
          800: '#2a302e',
          900: '#1a201e',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: '#222222',
            lineHeight: '1.8',
            img: {
              width: '100%',
              marginTop: '0px',
              marginBottom: '0px',
              position: 'unset !important',
            },
            blockquote: {
              p: {
                whiteSpace: 'pre-line',
              },
            },
            h1: {
              color: '#222222',
              fontFamily: serifStack,
            },
            h2: {
              color: '#222222',
              fontFamily: serifStack,
            },
            h3: {
              color: '#222222',
              fontFamily: serifStack,
            },
            h4: {
              color: '#222222',
              fontFamily: serifStack,
            },
            pre: {
              code: {
                '::-webkit-scrollbar': {
                  height: '.25rem',
                },
                '::-webkit-scrollbar-thumb': {
                  backgroundColor: '#d1dad7',
                  borderRadius: '.25rem',
                },
              },
              overflowY: 'hidden',
              fontFamily: monoStack,
              paddingBottom: '.5rem',
              backgroundColor: '#e9eeed',
              color: '#535e5a',
              scrollbarColor: '#d1dad7 transparent',
              borderRadius: '0.75rem',
            },
            a: {
              wordBreak: 'break-all',
              color: '#6d7a75',
              '&:hover': {
                color: '#505c58',
              },
            },
            blockquote: {
              marginLeft: 'unset',
              color: '#6d7a75',
              borderLeftColor: '#d1dad7',
            },
            ul: {
              paddingLeft: 'unset',
            },
            ol: {
              paddingLeft: 'unset',
            },
            p: {
              code: {
                fontFamily: monoStack,
                margin: '0 .25rem',
                padding: '.15rem .5rem',
                borderRadius: '.375rem',
                backgroundColor: '#e5ebe9',
                color: '#535e5a',
                wordBreak: 'break-all',
              },
              'code:after': {
                content: 'unset',
              },
              'code:before': {
                content: 'unset',
              },
            },
            hr: {
              borderColor: '#d1dad7',
            },
            strong: {
              color: '#222222',
            },
          },
        },
        invert: {
          css: {
            color: '#d8dddb',
            h1: { color: '#edf0ef' },
            h2: { color: '#edf0ef' },
            h3: { color: '#edf0ef' },
            h4: { color: '#edf0ef' },
            strong: { color: '#edf0ef' },
            pre: {
              backgroundColor: '#1f2625',
              color: '#929c98',
              scrollbarColor: '#3e4846 transparent',
              'code::-webkit-scrollbar-thumb': {
                backgroundColor: '#3e4846',
              },
            },
            a: {
              color: '#929c98',
              '&:hover': {
                color: '#b8c0bd',
              },
            },
            blockquote: {
              color: '#929c98',
              borderLeftColor: '#323b39',
            },
            p: {
              code: {
                backgroundColor: '#2a3230',
                color: '#929c98',
              },
            },
            hr: {
              borderColor: '#323b39',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
