import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="dark:bg-dark-800 bg-light-100 duration-200 transition-all">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
