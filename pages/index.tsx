import Layout from '@/components/layout'
import { getList } from '@/lib/notion'
import { timeFormat } from '@/lib/time'
import Link from 'next/link'
import { BLOG } from '@/blog.config'

interface PostItem {
  id: string
  title: string | null
  description: string | null
  date: string | null
  draft: boolean
  tags: string[]
}

interface HomeProps {
  list: PostItem[]
}

export async function getStaticProps() {
  const list = await getList()

  return {
    props: {
      list,
    },
    revalidate: 3600,
  }
}

export default function Home({ list }: HomeProps) {
  return (
    <Layout
      pageInfo={{
        pageName: BLOG.siteName,
        description: BLOG.siteName,
        link: BLOG.link,
        type: 'website',
      }}
    >
      <div className="flex-1 flex flex-col mt-6 mb-12 w-full">
        <div className="flex flex-col">
          {list.map((item, index) => {
            return !item.draft ? (
              <Link
                key={item.id}
                href={`/posts/${item.id}`}
                className="no-underline text-dark-900 dark:text-dark-100 group"
              >
                <div className="py-6 pl-4 border-l-2 border-transparent group-hover:border-dark-400 dark:group-hover:border-dark-300 transition-colors">
                  <div className="text-xs text-dark-400 dark:text-dark-400 tracking-wider">
                    {timeFormat(item.date)}
                  </div>
                  <div className="mt-2 text-lg md:text-xl font-bold font-serif group-hover:text-dark-600 dark:group-hover:text-dark-50 transition-colors">
                    {item.title}
                  </div>
                  {item.description && (
                    <div className="mt-1.5 text-sm text-dark-500 dark:text-dark-300 line-clamp-2">
                      {item.description}
                    </div>
                  )}
                </div>
                {index < list.filter((i) => !i.draft).length - 1 && (
                  <div className="h-px bg-light-300/70 dark:bg-dark-700/70" />
                )}
              </Link>
            ) : null
          })}
        </div>
      </div>
    </Layout>
  )
}
