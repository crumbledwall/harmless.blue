import { ThemeProvider } from 'next-themes'
import '@/styles/fonts.css'
import '@/styles/globals.css'
import '@/styles/hljs.css'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
