import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head />
      <body className="dark:bg-dark-800 bg-light-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
