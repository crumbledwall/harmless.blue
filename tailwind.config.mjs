// Tailwind v4 takes the design tokens from styles/globals.css (@theme). This file only holds the
// typography plugin's `prose` customization, which the plugin still reads from a JS theme.
// It is loaded by the `@config` line in styles/globals.css.
import typography from '@tailwindcss/typography'

// Short accent bar in front of article h2/h3.
const headingBar = {
  content: '""',
  display: 'inline-block',
  width: '14px',
  height: '2px',
  marginRight: '10px',
  verticalAlign: '0.3em',
  backgroundColor: 'var(--accent)'
}

// Grey highlighter under links, as on m-cosmosss.github.io; it grows on hover.
const linkHighlight = (height, alpha) => `inset 0 -${height} rgb(189 195 199 / ${alpha})`

/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--ink)',
            '--tw-prose-headings': 'var(--ink)',
            '--tw-prose-lead': 'var(--muted)',
            '--tw-prose-links': 'var(--accent)',
            '--tw-prose-bold': 'var(--ink)',
            '--tw-prose-counters': 'var(--faint)',
            '--tw-prose-bullets': 'var(--faint)',
            '--tw-prose-hr': 'var(--hair)',
            '--tw-prose-quotes': 'var(--muted)',
            '--tw-prose-quote-borders': 'var(--hair)',
            '--tw-prose-captions': 'var(--faint)',
            '--tw-prose-kbd': 'var(--ink)',
            '--tw-prose-code': 'var(--code-inline-fg)',
            '--tw-prose-pre-code': 'var(--code-fg)',
            '--tw-prose-pre-bg': 'var(--code-bg)',
            '--tw-prose-th-borders': 'var(--hair)',
            '--tw-prose-td-borders': 'var(--hair)',
            fontSize: '0.96875rem',
            lineHeight: '1.95',
            p: {
              marginTop: '0.85em',
              marginBottom: '0.85em'
            },
            a: {
              fontWeight: 'inherit',
              textDecoration: 'none',
              overflowWrap: 'anywhere',
              boxShadow: linkHighlight('2px', 0.5),
              transition: 'box-shadow 300ms ease',
              '&:hover': {
                boxShadow: linkHighlight('10px', 0.7)
              }
            },
            h1: {
              fontSize: '1.5em',
              fontWeight: '700',
              letterSpacing: '-0.015em',
              lineHeight: '1.35',
              marginTop: '2em',
              marginBottom: '0.8em'
            },
            h2: {
              fontSize: '1.2em',
              fontWeight: '700',
              letterSpacing: '-0.01em',
              lineHeight: '1.45',
              marginTop: '2em',
              marginBottom: '0.75em'
            },
            'h2::before': headingBar,
            h3: {
              fontSize: '0.8125rem',
              fontWeight: '600',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              lineHeight: '1.6',
              marginTop: '2em',
              marginBottom: '0.8em'
            },
            'h3::before': headingBar,
            h4: {
              fontWeight: '600'
            },
            // Grey bar on a light grey panel, as on the reference site.
            blockquote: {
              marginLeft: 'unset',
              padding: '0.75em 1em',
              borderInlineStartWidth: '4px',
              backgroundColor: 'var(--quote-bg)',
              fontWeight: 'inherit',
              fontStyle: 'italic',
              quotes: 'none'
            },
            'blockquote > :first-child': { marginTop: '0' },
            'blockquote > :last-child': { marginBottom: '0' },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            code: {
              fontSize: '0.85em',
              fontWeight: '400',
              padding: '0.12em 0.45em',
              borderRadius: '5px',
              backgroundColor: 'var(--code-inline-bg)',
              overflowWrap: 'anywhere'
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: {
              fontSize: '0.8125rem',
              lineHeight: '1.75',
              padding: '18px 20px',
              marginTop: '18px',
              marginBottom: '18px',
              border: '1px solid var(--hair)',
              borderRadius: '10px'
            },
            img: {
              width: '100%',
              marginTop: '0px',
              marginBottom: '0px',
              position: 'unset !important'
            },
            ul: {
              paddingLeft: '1.25em'
            },
            ol: {
              paddingLeft: '1.25em'
            }
          }
        }
      }
    }
  },
  plugins: [typography]
}

export default config
