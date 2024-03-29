import Layout from '@/components/layout'
import { getPost } from '@/lib/notion'
import { parseMarkdown } from '@/lib/paser'
import { timeFormat } from '@/lib/time'
import { pageLink } from '@/lib/link'

export default function Post({ postData }) {
  return (
    <Layout
      pageInfo={{
        pageName: postData?.title,
        description: postData?.description,
        link: pageLink(postData?.id, 'article'),
        type: 'article'
      }}
    >
      <div className="flex flex-col items-start py-5 dark:text-light-700">
        <div className="text-3xl md:text-4xl font-bold mt-5 font-serif">{postData?.title}</div>
        <div className="my-4 font-monospace text-gray-400 dark:text-neutral-500">
          {timeFormat(postData?.date)}
        </div>
        <article className="prose max-w-none w-full dark:prose-dark">
          {postData ? parseMarkdown(postData?.content) : ''}
        </article>
      </div>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  const postData = await getPost(params.id as string)
  return {
    props: {
      postData
    },
    revalidate: 10
  }
}
