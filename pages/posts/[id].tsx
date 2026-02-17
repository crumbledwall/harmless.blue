import Layout from '@/components/layout'
import { getPost } from '@/lib/notion'
import { parseMarkdown } from '@/lib/parser'
import { timeFormat } from '@/lib/time'
import { pageLink } from '@/lib/link'
import { useRouter } from 'next/router'

interface PostData {
  id: string
  title: string
  content: string
  date: string | null
  description: string | null
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
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="text-xl">Loading...</div>
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
      <div className="flex flex-col items-start py-5 text-dark-900 dark:text-dark-100">
        <div className="text-3xl md:text-4xl font-bold mt-5 font-serif">{postData.title}</div>
        <div className="my-4 text-sm text-dark-400 dark:text-dark-400">
          {timeFormat(postData.date)}
        </div>
        <article className="prose max-w-none w-full dark:prose-invert">
          {parseMarkdown(postData.content)}
        </article>
      </div>
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
    const postData = await getPost(params.id)
    return {
      props: {
        postData: postData || null,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error(`Error fetching post ${params.id}:`, error)
    return {
      props: {
        postData: null,
      },
      revalidate: 60,
    }
  }
}
