import Head from 'next/head'
import { useTheme } from 'next-themes'
import { BLOG } from '@/blog.config'

const PageHead = ({ PageName }) => {
  const { resolvedTheme } = useTheme()
  return (
    <>
      <Head>
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge, chrome=1" />
        <meta name="referrer" content="no-referrer" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width,
          initial-scale=1.0,
          maximum-scale=1.0,
          user-scalable=0"
        />
        <meta name="description" content={BLOG.siteName} />
        <meta property="og:title" content={PageName} />
        <meta property="og:type" content="Website" />
        <meta property="og:url" content={BLOG.link} />
        <meta property="og:image" content="/favicon.svg" />
        <meta property="og:description" content={BLOG.siteName} />
        <meta name="twitter:card" content="summary" />
        <link rel="canonical" href={BLOG.link} />
        <link rel="stylesheet" type="text/css" href={resolvedTheme === 'light'?'/github.css':'/codepen-embed.css'} />
        <title>{PageName}</title>
      </Head>
    </>
  )
}

export default PageHead
