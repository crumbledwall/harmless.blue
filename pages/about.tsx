import type { Root } from 'hast'
import Layout from '@/components/layout'
import Markdown from '@/components/markdown'
import { getAbout } from '@/lib/notion'
import { markdownToHast } from '@/lib/markdown'
import { pageLink } from '@/lib/link'

interface PostData {
  title: string
  description: string
  tree: Root
}

interface PostProps {
  postData: PostData
}

export default function About({ postData }: PostProps) {
  return (
    <Layout
      pageInfo={{
        pageName: 'About',
        description: postData.description || 'About page',
        link: pageLink('about', 'page'),
        type: 'article',
      }}
    >
      <h1 className="mb-[22px] text-2xl font-bold leading-[1.35] tracking-[-0.015em] md:text-[26px]">
        {postData.title}
      </h1>
      <article className="prose w-full max-w-none">
        <Markdown tree={postData.tree} />
      </article>
    </Layout>
  )
}

export const getStaticProps = async () => {
  try {
    const about = await getAbout()

    return {
      props: {
        postData: {
          title: about.title,
          description: about.content.slice(0, 150),
          tree: await markdownToHast(about.content),
        },
      },
      revalidate: 3600,
    }
  } catch (error) {
    console.error('Error fetching about page:', error)
    return {
      props: {
        postData: { title: 'About', description: '', tree: { type: 'root', children: [] } },
      },
      revalidate: 3600,
    }
  }
}
