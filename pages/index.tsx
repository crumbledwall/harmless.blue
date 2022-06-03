import Layout from '@/components/common/layout'
import { getList } from '@/lib/yuque'
import { timeFormat } from '@/lib/time'
import Link from 'next/link'

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
    <Layout pageName="home">
      <div className="flex-1 flex flex-col my-8 w-full">
        <div className="flex-col">
          {list.map((item) => {
            return (
              <div key={item.id}>
                <Link href={`/posts/${item.slug}`}>
                  <div className="text-xl font-bold cursor-pointer font-serif text-dark-100">
                    ○ {item.title}
                  </div>
                </Link>
                <div className="text-sm cursor-pointer ml-5 font-monospace text-dark-100">
                  {' '}
                  {timeFormat(item.created_at)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
