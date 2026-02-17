import { ThemeProvider } from 'next-themes'
import { config } from '@fortawesome/fontawesome-svg-core'
import { Noto_Sans_SC, Noto_Serif_SC, JetBrains_Mono } from 'next/font/google'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

config.autoAddCss = false

const notoSansSC = Noto_Sans_SC({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const notoSerifSC = Noto_Serif_SC({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${notoSansSC.variable} ${notoSerifSC.variable} ${jetbrainsMono.variable} font-sans`}
    >
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  )
}

export default App
