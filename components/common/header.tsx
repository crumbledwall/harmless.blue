import Image from 'next/image'
import Link from 'next/link'
import { BLOG } from '@/blog.config'

const PageHeader = () => {
  return (
    <div className="w-full flex flex-col justify-center border-b-2 border-light-900 dark:border-dark-50 dark:text-light-700">
      <div className="w-full">
        <div className="flex items-center gap-8 px-4 py-5 w-full flex-col md:flex-row md:pb-0">
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
      <div className="mx-4 mb-4 flex items-center justify-center md:justify-end">
        <div className="flex flex-row gap-4 font-bold font-mono">
          <Link href="/">
            <div className="text-lg cursor-pointer underline decoration-transparent hover:decoration-current duration-500 transition-all">
              POSTS
            </div>
          </Link>
          <Link href="/about">
            <div className="text-lg cursor-pointer underline decoration-transparent hover:decoration-current duration-500 transition-all">
              ABOUT
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PageHeader
