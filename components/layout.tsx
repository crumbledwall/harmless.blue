import Head from '@/components/head'
import Header from '@/components/header'
import Footer from '@/components/footer'
import type { PageInfo } from '@/types/page'

export default function Layout({
  children,
  pageInfo
}: {
  children: React.ReactNode
  pageInfo: PageInfo
}) {
  return (
    <>
      <Head pageInfo={pageInfo} />
      <div className="flex flex-col items-center">
        <div className="w-full md:w-186 px-8 min-h-screen flex flex-col items-center">
          <Header />
          <div className="flex-1 flex-col items-center w-full">{children}</div>
          <Footer />
        </div>
      </div>
    </>
  )
}
