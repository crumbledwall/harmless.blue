import Head from '@/components/common/head'
import Header from '@/components/common/header'
import Footer from '@/components/common/footer'

export default function Layout({
  children,
  pageName
}: {
  children: React.ReactNode
  pageName: string
}) {
  return (
    <>
      <Head PageName={pageName} />
      <div className="flex flex-col items-center dark:bg-dark-900">
        <div className="container px-72 min-h-screen flex flex-col items-center">
          <Header />
          <div className="flex-1 flex-col items-center w-full">{children}</div>
          <Footer />
        </div>
      </div>
    </>
  )
}
