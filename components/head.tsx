import Head from 'next/head'
import { useTheme } from 'next-themes'
import type { PageInfo } from '@/types/page'

const PageHead = ({ pageInfo }: { pageInfo: PageInfo }) => {
  const { resolvedTheme } = useTheme()
  return (
    <>
      <Head>
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge, chrome=1" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width,
          initial-scale=1.0,
          maximum-scale=1.0,
          user-scalable=0"
        />
        <meta name="description" content={pageInfo.description} />
        <meta property="og:title" content={pageInfo.pageName} />
        <meta property="og:type" content={pageInfo.type} />
        <meta property="og:url" content={pageInfo.link} />
        <meta property="og:image" content="/favicon.svg" />
        <meta property="og:description" content={pageInfo.description} />
        <meta name="twitter:card" content="summary" />
        <link rel="stylesheet" type="text/css" href={resolvedTheme === 'light'?'/github.css':'/codepen-embed.css'} />
        <title>{pageInfo.pageName}</title>
      </Head>
    </>
  )
}

export default PageHead
