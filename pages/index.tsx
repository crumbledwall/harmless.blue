import Layout from '@/components/layout'
import { getList } from '@/lib/yuque'
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
      <div className="w-full h-full flex-1 flex items-center justify-center">
        <div className="flex-col">
          {list.map((item) => {
            return (
              <div key={item.id}>
                <Link href={`/posts/${item.slug}`}>{item.title}</Link>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
