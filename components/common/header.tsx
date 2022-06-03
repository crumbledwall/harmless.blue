import Image from 'next/image'
import Link from 'next/link'
import { BLOG } from '@/blog.config'

const PageHeader = () => {
  return (
    <div className="w-full flex h-42 justify-center">
      <div className="ring-dark-400 border-b-2 flex items-center gap-8 px-16 py-5 w-full">
        <div className="w-32 h-32">
          <Link href="/">
            <Image
              src="/avatar.png"
              alt="avatar"
              width="200px"
              height="200px"
              className="rounded-full cursor-pointer"
            />
          </Link>
        </div>
        <div>
          <div className="font-bold text-3xl font-serif">{BLOG.siteName}</div>
          <div className="font-monospace">{BLOG.description}</div>
        </div>
      </div>
    </div>
  )
}

export default PageHeader
