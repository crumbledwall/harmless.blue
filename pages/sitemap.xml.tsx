import { getList } from '@/lib/notion'
import { BLOG } from '@/blog.config'

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${BLOG.link}</loc>
      </url>
      <url>
        <loc>${BLOG.link}about</loc>
      </url>
      ${posts.map(({ id, draft }) => {
        if(!draft){
          return `
            <url>
              <loc>${`${BLOG.link}posts/${id}`}</loc>
            </url>
          `
        }
      }).join('')}
    </urlset>
  `
}

function SiteMap() {
  // empty
}

export async function getServerSideProps({ res }) {
  const posts = await getList();
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;