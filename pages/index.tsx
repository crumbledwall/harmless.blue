import Layout from '@/components/layout'
import PostList from '@/components/post-list'
import { getAllPostsList, PAGE_SIZE } from '@/lib/notion'
import type { PostListItem } from '@/lib/notion'
import { BLOG } from '@/blog.config'

interface HomeProps {
  list: PostListItem[]
  total: number
  currentPage: number
  totalPages: number
}

export async function getStaticProps() {
  const allPosts = await getAllPostsList()
  const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE))
  const list = allPosts.slice(0, PAGE_SIZE)

  return {
    props: {
      list,
      total: allPosts.length,
      currentPage: 1,
      totalPages,
    },
    revalidate: 3600,
  }
}

export default function Home({ list, total, currentPage, totalPages }: HomeProps) {
  return (
    <Layout
      pageInfo={{
        pageName: BLOG.siteName,
        description: BLOG.siteName,
        link: BLOG.link,
        type: 'website',
      }}
      postCount={total}
    >
      <PostList
        list={list}
        offset={0}
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </Layout>
  )
}
