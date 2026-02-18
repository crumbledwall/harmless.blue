import { GetServerSideProps } from 'next'
import { getAllPosts } from '@/lib/notion'
import { BLOG } from '@/blog.config'

interface PostItem {
  id: string
}

function generateSiteMap(posts: PostItem[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${BLOG.link}</loc>
      </url>
      <url>
        <loc>${BLOG.link}about</loc>
      </url>
      <url>
        <loc>${BLOG.link}friends</loc>
      </url>
      ${posts
        .map(({ id }) => {
          return `
            <url>
              <loc>${`${BLOG.link}posts/${id}`}</loc>
            </url>
          `
        })
        .join('')}
    </urlset>
  `
}

function SiteMap() {
  // empty
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await getAllPosts()
  const sitemap = generateSiteMap(posts)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
