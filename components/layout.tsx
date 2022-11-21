import Head from '@/components/head'
import Header from '@/components/header'
import Footer from '@/components/footer'

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
