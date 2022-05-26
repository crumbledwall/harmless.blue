import Layout from '@/components/layout'
import { getPost } from '@/lib/yuque'
import { parseMarkdown } from '@/lib/paser'
import { timeFormat } from '@/lib/time'

export default function Post({ postData }) {
  return (
    <Layout pageName={postData?.title}>
      <div className="flex flex-col items-center container py-10">
        <div className="text-3xl font-bold my-20">{postData?.title}</div>
        <div>{timeFormat(postData?.time)}</div>
        <article className="prose">{postData ? parseMarkdown(postData.content) : ''}</article>
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
