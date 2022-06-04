import Image from 'next/image'
import Link from 'next/link'
import { BLOG } from '@/blog.config'

const PageHeader = () => {
  return (
    <div className="w-full flex justify-center dark:text-light-700">
      <div className="border-b-2 border-light-900 dark:border-dark-50 flex items-center gap-8 px-4 py-5 w-full flex-col md:flex-row">
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
        <div className="w-full flex flex-col items-center md:items-start">
          <div className="font-bold sm:text-xl md:text-3xl font-serif text-center">
            {BLOG.siteName}
          </div>
          <div className="font-monospace text-sm md:text-base">{BLOG.description}</div>
        </div>
      </div>
    </div>
  )
}

export default PageHeader
