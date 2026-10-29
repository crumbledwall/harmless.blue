import Head from '@/components/head'
import Header from '@/components/header'
import Footer from '@/components/footer'
import type { PageInfo } from '@/types/page'

interface LayoutProps {
  children: React.ReactNode
  pageInfo: PageInfo
  /** Total number of posts, shown next to "Writing" in the nav when known. */
  postCount?: number
}

export default function Layout({ children, pageInfo, postCount }: LayoutProps) {
  return (
    <>
      <Head pageInfo={pageInfo} />
      <div className="md:px-4 md:py-10">
        <div className="mx-auto flex min-h-screen max-w-[920px] flex-col bg-paper md:grid md:min-h-[calc(100vh-5rem)] md:grid-cols-[240px_minmax(0,1fr)] md:rounded md:border md:border-hair md:shadow-[0_30px_60px_-30px_rgba(40,33,22,0.35)]">
          <Header postCount={postCount} />
          <div className="flex min-w-0 flex-1 flex-col px-5 py-8 md:px-10 md:py-[42px]">
            <main className="w-full max-w-[640px] flex-1">{children}</main>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}
