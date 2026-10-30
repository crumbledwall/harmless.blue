import Head from '@/components/head'
import Header from '@/components/header'
import Footer from '@/components/footer'
import type { PageInfo } from '@/types/page'

interface LayoutProps {
  children: React.ReactNode
  pageInfo: PageInfo
}

// The paper sheet spans the full viewport height, so there is no card edge that scrolls
// away and the sticky rail sits at top: 0 from the first frame.
export default function Layout({ children, pageInfo }: LayoutProps) {
  return (
    <>
      <Head pageInfo={pageInfo} />
      <div className="mx-auto flex min-h-screen max-w-[1040px] flex-col bg-paper md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[256px_minmax(0,1fr)] min-[1080px]:border-x min-[1080px]:border-hair min-[1080px]:shadow-[0_0_80px_-28px_rgba(0,0,0,0.12)] dark:shadow-none">
        <Header />
        <div className="flex min-w-0 flex-1 flex-col px-5 pb-8 pt-8 md:px-10 md:pb-10 md:pt-14 lg:px-12">
          <main className="w-full flex-1">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  )
}
