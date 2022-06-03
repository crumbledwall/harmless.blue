import Layout from '@/components/common/layout'
import { getPost } from '@/lib/yuque'
import { parseMarkdown } from '@/lib/paser'
import { timeFormat } from '@/lib/time'
import 'highlight.js/styles/github-dark.css'

export default function Post({ postData }) {
  return (
    <Layout pageName={postData?.title}>
      <div className="flex flex-col items-center container py-5">
        <div className="text-4xl font-bold mt-5">{postData?.title}</div>
        <div className="my-4">{timeFormat(postData?.time)}</div>
        <article className="prose max-w-none">
          {postData ? parseMarkdown(postData.content) : ''}
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
    }
  }
}
