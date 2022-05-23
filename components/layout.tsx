import Head from '@/components/head'

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
      <div className="min-h-screen">{children}</div>
    </>
  )
}
