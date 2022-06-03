import Layout from '@/components/common/layout'
import { getAbout } from '@/lib/yuque'
import { parseMarkdown } from '@/lib/paser'

export default function Post({ postData }) {
  return (
    <Layout pageName={postData?.title}>
      <div className="flex flex-col items-center container py-10">
        <div className="text-3xl font-bold my-20">{postData?.title}</div>
        <article className="prose">{postData ? parseMarkdown(postData.content) : ''}</article>
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
