import Layout from '@/components/layout'
import PostList from '@/components/post-list'
import { getAllPostsList, PAGE_SIZE } from '@/lib/notion'
import type { PostListItem } from '@/lib/notion'
import { BLOG } from '@/blog.config'
import type { GetStaticPaths, GetStaticProps } from 'next'

interface PageProps {
  list: PostListItem[]
  offset: number
  total: number
  currentPage: number
  totalPages: number
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const page = Number(params?.page)

  if (!page || page < 2 || !Number.isInteger(page)) {
    return { notFound: true }
  }

  const allPosts = await getAllPostsList()
  const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE))

  if (page > totalPages) {
    return { notFound: true }
  }

  const start = (page - 1) * PAGE_SIZE
  const list = allPosts.slice(start, start + PAGE_SIZE)

  return {
    props: {
      list,
      offset: start,
      total: allPosts.length,
      currentPage: page,
      totalPages,
    },
    revalidate: 3600,
  }
}

export default function Page({ list, offset, total, currentPage, totalPages }: PageProps) {
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
        offset={offset}
        total={total}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </Layout>
  )
}
