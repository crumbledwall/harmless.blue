import Layout from '@/components/layout'
import Link from 'next/link'
import Image from 'next/image'
import { BLOG } from '@/blog.config'

export default function Post() {
  return (
    <Layout pageName="FRIENDS">
      <div className="flex flex-col items-start py-5 dark:text-light-700">
        <div className="text-3xl md:text-4xl font-bold mt-5 font-serif"></div>
        <article className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
            {BLOG.friends.map((friend) => {
              return (
                <Link href={friend.link} key={friend.name} className="no-underline text-dark-100 dark:text-light-700">
                  <div className="flex gap-8 cursor-pointer">
                    <div className="w-12 h-12 sm:(w-20 h-20) md:(w-24 h-24) relative rounded-xl overflow-hidden">
                      <Image
                        loader={({ src }) => src}
                        src={friend.avatar}
                        alt={friend.name}
                        placeholder={'blur'}
                        blurDataURL="/placeholder.svg"
                        unoptimized={true}
                        layout="fill"
                        priority={true}
                      ></Image>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="text-lg sm:text-2xl font-bold">{friend.name}</div>
                      <div className="text-sm sm:text-lg font-monospace overflow-ellipsis">
                        {friend.description}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </article>
      </div>
    </Layout>
  )
}
