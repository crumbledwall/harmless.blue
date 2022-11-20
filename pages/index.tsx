import Layout from '@/components/common/layout'
import { getList } from '@/lib/yuque'
import { timeFormat } from '@/lib/time'
import Link from 'next/link'
import { BLOG } from '@/blog.config'

export async function getStaticProps() {
  const list = await getList()
  return {
    props: {
      list
    }
  }
}

export default function Home({ list }) {
  return (
    <Layout pageName={BLOG.siteName}>
      <div className="flex-1 flex flex-col my-8 w-full ">
        <div className="flex flex-col gap-4">
          {list.map((item) => {
            console.log(item);
            return (
              <div key={item.id} className="text-dark-100 dark:text-light-700 flex gap-4 my-4">
                <div> ○ </div>
                <div className="flex flex-col gap-4">
                  <Link href={`/posts/${item.slug}`}>
                    <div className="text-xl font-bold cursor-pointer font-serif underline decoration-transparent hover:decoration-current duration-500 transition-decoration">
                      {item.title}
                    </div>
                  </Link>
                  <div className="text-sm font-monospace text-gray-500 dark:text-neutral-400">
                    {item.custom_description.length > 0 ? item.custom_description : item.description}
                  </div>
                  <div className="text-sm font-monospace text-gray-400 dark:text-neutral-500">
                    {timeFormat(item.created_at)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
