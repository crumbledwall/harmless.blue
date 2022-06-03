import Layout from '@/components/common/layout'
import { getAbout } from '@/lib/yuque'
import { parseMarkdown } from '@/lib/paser'

export default function Post({ postData }) {
  return (
    <Layout pageName={postData?.title}>
      <div className="flex flex-col items-start container py-5">
        <div className="text-4xl font-bold mt-5 font-serif">{postData?.title}</div>
        <article className="prose max-w-none">
          {postData ? parseMarkdown(postData.content) : ''}
        </article>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const postData = await getAbout()
  return {
    props: {
      postData
    }
  }
}
