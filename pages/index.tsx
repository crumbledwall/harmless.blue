import Layout from '@/components/layout'
import { getList } from '@/lib/notion'
import { timeFormat } from '@/lib/time'
import Link from 'next/link'
import { BLOG } from '@/blog.config'

export async function getStaticProps() {
  const list = await getList()

  return {
    props: {
      list
    },
    revalidate: 10
  }
}

export default function Home({ list }) {
  return (
    <Layout pageName={BLOG.siteName}>
      <div className="flex-1 flex flex-col my-8 w-full ">
        <div className="flex flex-col gap-4">
          {list.map((item) => {
            return !item.draft ? (
              <div key={item.id} className="text-dark-100 dark:text-light-700 flex gap-4 my-4">
                <div> ○ </div>
                <div className="flex flex-col gap-4">
                  <Link href={`/posts/${item.id}`}>
                    <div className="text-xl font-bold cursor-pointer font-serif underline decoration-transparent hover:decoration-current duration-500 transition-decoration">
                      {item.title}
                    </div>
                  </Link>
                  <div className="text-sm font-monospace text-gray-500 dark:text-neutral-400">
                    {item.description}
                  </div>
                  <div className="text-sm font-monospace text-gray-400 dark:text-neutral-500">
                    {timeFormat(item.date)}
                  </div>
                </div>
              </div>
            ) : null
          })}
        </div>
      </div>
    </Layout>
  )
}
