import Head from 'next/head'
import { useTheme } from 'next-themes'
import { BLOG } from '@/blog.config'
import type { PageInfo } from '@/types/page'

interface PageHeadProps {
  pageInfo: PageInfo
}

const PageHead = ({ pageInfo }: PageHeadProps) => {
  const { resolvedTheme } = useTheme()

  return (
    <>
      <Head>
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=1"
        />
        <meta name="description" content={pageInfo.description} />
        <meta property="og:title" content={pageInfo.pageName} />
        <meta property="og:type" content={pageInfo.type} />
        <meta property="og:url" content={pageInfo.link} />
        <meta property="og:image" content={`${BLOG.link}favicon.png`} />
        <meta property="og:description" content={pageInfo.description} />
        <meta property="og:site_name" content={BLOG.siteName} />
        <meta name="twitter:card" content="summary" />
        <link rel="canonical" href={pageInfo.link} />
        <link
          rel="stylesheet"
          type="text/css"
          href={resolvedTheme === 'light' ? '/github.css' : '/codepen-embed.css'}
        />
        <title>{pageInfo.pageName}</title>
      </Head>
    </>
  )
}

export default PageHead
