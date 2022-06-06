import Layout from '@/components/common/layout'

export default function Post() {
  return (
    <Layout pageName="friends">
      <div className="flex flex-col items-start py-5 dark:text-light-700">
        <div className="text-3xl md:text-4xl font-bold mt-5 font-serif"></div>
        <article className="prose max-w-none w-full">{''}</article>
      </div>
    </Layout>
  )
}
