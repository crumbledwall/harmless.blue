import type { Root } from 'hast'
import Layout from '@/components/layout'
import Markdown from '@/components/markdown'
import { getPost } from '@/lib/notion'
import { markdownToHast } from '@/lib/markdown'
import { timeFormat } from '@/lib/time'
import { pageLink } from '@/lib/link'
import { useRouter } from 'next/router'

interface PostData {
  id: string
  title: string
  date: string | null
  description: string | null
  tags: string[]
  tree: Root
}

interface PostProps {
  postData: PostData | null
}

interface GetStaticPropsContext {
  params: {
    id: string
  }
}

export default function Post({ postData }: PostProps) {
  const router = useRouter()

  if (router.isFallback || !postData) {
    return (
      <Layout
        pageInfo={{
          pageName: 'Loading...',
          description: '',
          link: '',
          type: 'article',
        }}
      >
        <div className="flex min-h-[50vh] items-center justify-center font-mono text-xs uppercase tracking-[0.22em] text-faint">
          Loading…
        </div>
      </Layout>
    )
  }

  return (
    <Layout
      pageInfo={{
        pageName: postData.title,
        description: postData.description || '',
        link: pageLink(postData.id, 'article'),
        type: 'article',
      }}
    >
      <header className="mb-[22px]">
        <h1 className="text-2xl font-bold leading-[1.35] tracking-[-0.015em] md:text-[26px]">
          {postData.title}
        </h1>
        <p className="mt-1.5 font-mono text-xs text-muted">
          {postData.date && <time dateTime={postData.date}>{timeFormat(postData.date)}</time>}
          {postData.date && postData.tags.length > 0 && ' — '}
          {postData.tags.join(' / ')}
        </p>
      </header>
      <article className="prose w-full max-w-none">
        <Markdown tree={postData.tree} />
      </article>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  try {
    const post = await getPost(params.id)
    // Only the rendered tree is sent to the client; the raw Markdown stays on the server.
    const postData = post
      ? {
          id: post.id,
          title: post.title,
          date: post.date,
          description: post.description,
          tags: post.tags,
          tree: await markdownToHast(post.content),
        }
      : null

    return {
      props: {
        postData,
      },
      revalidate: 3600,
    }
  } catch (error) {
    console.error(`Error fetching post ${params.id}:`, error)
    return {
      props: {
        postData: null,
      },
      revalidate: 3600,
    }
  }
}
