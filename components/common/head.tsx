import Head from 'next/head'
import { useEffect, useState } from 'react'
import { BLOG } from '@/blog.config'

const PageHead = ({ PageName }) => {
  const [scheme, setScheme] = useState('light')

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setScheme('dark')
    }
  }, [])

  return (
    <>
      <Head>
        <meta content={scheme} name="color-scheme" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge, chrome=1" />
        <meta name="referrer" content="no-referrer" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="width=device-width,
          initial-scale=1.0,
          maximum-scale=1.0,
          user-scalable=0"
        />
        <meta name="description" content={BLOG.siteName} />
        <meta property="og:title" content={BLOG.siteName} />
        <meta property="og:type" content="Website" />
        <meta property="og:url" content={BLOG.link} />
        <meta property="og:image" content="/favicon.svg" />
        <meta property="og:description" content={BLOG.siteName} />
        <meta name="twitter:card" content="summary" />
        <link rel="canonical" href={BLOG.link} />
        <title>{PageName}</title>
      </Head>
    </>
  )
}

export default PageHead
