import Head from '@/components/head'
import Header from '@/components/header'
import Footer from '@/components/footer'
import type { PageInfo } from '@/types/page'

interface LayoutProps {
  children: React.ReactNode
  pageInfo: PageInfo
}

export default function Layout({ children, pageInfo }: LayoutProps) {
  return (
    <>
      <Head pageInfo={pageInfo} />
      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl px-6 md:px-8 min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  )
}
