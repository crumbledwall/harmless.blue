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
          50: '#F5EEE6',
          100: '#EDE4D8',
          200: '#DDD0BF',
          300: '#C4B49C',
          400: '#A0907A',
          500: '#7A6D5D',
          600: '#564A3C',
          700: '#3A3128',
          800: '#261F19',
          900: '#1A1610',
        },
        light: {
          50: '#FFFDF8',
          100: '#FFF8EE',
          200: '#F5EADB',
          300: '#E8DAC5',
          400: '#C4B49C',
          500: '#9C8B76',
          600: '#756758',
          700: '#564A3C',
          800: '#3A3128',
          900: '#261F19',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: '#3A3128',
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
              color: '#261F19',
              fontFamily: serifStack,
            },
            h2: {
              color: '#261F19',
              fontFamily: serifStack,
            },
            h3: {
              color: '#261F19',
              fontFamily: serifStack,
            },
            h4: {
              color: '#261F19',
              fontFamily: serifStack,
            },
            pre: {
              code: {
                '::-webkit-scrollbar': {
                  height: '.25rem',
                },
                '::-webkit-scrollbar-thumb': {
                  backgroundColor: '#DDD0BF',
                  borderRadius: '.25rem',
                },
              },
              overflowY: 'hidden',
              fontFamily: monoStack,
              paddingBottom: '.5rem',
              backgroundColor: '#F9F2E8',
              color: '#7A6D5D',
              scrollbarColor: '#DDD0BF transparent',
              borderRadius: '0.75rem',
            },
            a: {
              wordBreak: 'break-all',
              color: '#9C8B76',
              '&:hover': {
                color: '#756758',
              },
            },
            blockquote: {
              marginLeft: 'unset',
              color: '#9C8B76',
              borderLeftColor: '#E8DAC5',
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
                backgroundColor: '#F5EEE3',
                color: '#7A6D5D',
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
              borderColor: '#E8DAC5',
            },
            strong: {
              color: '#261F19',
            },
          },
        },
        invert: {
          css: {
            color: '#EDE4D8',
            h1: { color: '#F5EEE6' },
            h2: { color: '#F5EEE6' },
            h3: { color: '#F5EEE6' },
            h4: { color: '#F5EEE6' },
            strong: { color: '#F5EEE6' },
            pre: {
              backgroundColor: '#2D2620',
              color: '#C4B49C',
              scrollbarColor: '#4A3F34 transparent',
              'code::-webkit-scrollbar-thumb': {
                backgroundColor: '#4A3F34',
              },
            },
            a: {
              color: '#C4B49C',
              '&:hover': {
                color: '#DDD0BF',
              },
            },
            blockquote: {
              color: '#C4B49C',
              borderLeftColor: '#3A3128',
            },
            p: {
              code: {
                backgroundColor: '#332B22',
                color: '#C4B49C',
              },
            },
            hr: {
              borderColor: '#3A3128',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
