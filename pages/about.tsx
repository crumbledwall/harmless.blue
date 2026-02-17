import Layout from '@/components/layout'
import { getAbout } from '@/lib/notion'
import { parseMarkdown } from '@/lib/parser'
import { pageLink } from '@/lib/link'

interface PostData {
  title: string
  content: string
}

interface PostProps {
  postData: PostData
}

export default function About({ postData }: PostProps) {
  return (
    <Layout
      pageInfo={{
        pageName: 'About',
        description: postData.content?.slice(0, 150) || 'About page',
        link: pageLink('about', 'page'),
        type: 'article',
      }}
    >
      <div className="flex flex-col items-start py-5 text-dark-900 dark:text-dark-100">
        <div className="text-3xl md:text-4xl font-bold mt-5 font-serif">{postData.title}</div>
        <article className="prose max-w-none w-full dark:prose-invert">
          {parseMarkdown(postData.content)}
        </article>
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  try {
    const postData = await getAbout()

    return {
      props: {
        postData,
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching about page:', error)
    return {
      props: {
        postData: { title: 'About', content: '' },
      },
      revalidate: 60,
    }
  }
}
