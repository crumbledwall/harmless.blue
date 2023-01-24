import Layout from '@/components/layout'
import { getAbout } from '@/lib/notion'
import { parseMarkdown } from '@/lib/paser'
import { pageLink } from '@/lib/link'

export default function Post({ postData }) {
  return (
    <Layout pageInfo={{
      pageName: 'About',
      description: postData?.content,
      link: pageLink('about', 'page'),
      type: 'article',
    }}>
      <div className="flex flex-col items-start py-5 dark:text-light-700">
        <div className="text-3xl md:text-4xl font-bold mt-5 font-serif">{postData?.title}</div>
        <article className="prose max-w-none w-full">
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
    },
    revalidate: 10
  }
}
