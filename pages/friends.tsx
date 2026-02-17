import Layout from '@/components/layout'
import Link from 'next/link'
import Image from 'next/image'
import { BLOG } from '@/blog.config'
import { pageLink } from '@/lib/link'

interface Friend {
  name: string
  link: string
  description: string
  avatar: string
}

export default function Friends() {
  return (
    <Layout
      pageInfo={{
        pageName: 'Friends',
        description: 'My Friends',
        link: pageLink('friends', 'page'),
        type: 'article',
      }}
    >
      <div className="flex flex-col items-start py-6 text-dark-900 dark:text-dark-100">
        <h2 className="text-2xl md:text-3xl font-bold font-serif">Friends</h2>
        <article className="w-full mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {BLOG.friends.map((friend: Friend) => {
              return (
                <Link
                  href={friend.link}
                  key={friend.name}
                  className="no-underline text-dark-900 dark:text-dark-100 group"
                >
                  <div className="flex items-center gap-4 p-3.5 rounded-lg border border-transparent hover:border-light-300 dark:hover:border-dark-600 transition-all">
                    <div className="w-11 h-11 md:w-14 md:h-14 relative rounded-full overflow-hidden ring-1 ring-light-300/80 dark:ring-dark-600/80 flex-shrink-0">
                      <Image
                        loader={({ src }) => src}
                        src={friend.avatar}
                        alt={friend.name}
                        placeholder="blur"
                        blurDataURL="/placeholder.svg"
                        unoptimized
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="text-sm md:text-base font-bold group-hover:text-dark-600 dark:group-hover:text-dark-50 transition-colors truncate">
                        {friend.name}
                      </div>
                      <div className="text-xs md:text-sm text-dark-400 dark:text-dark-400 truncate">
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
