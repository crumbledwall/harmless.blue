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

const pad = (n: number) => String(n).padStart(2, '0')

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
      <div className="flex items-baseline justify-between border-b-2 border-ink pb-[22px]">
        <h1 className="text-[13px] font-semibold uppercase tracking-[0.26em]">Friends</h1>
        <span className="font-mono text-xs text-muted">Links / {pad(BLOG.friends.length)}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8">
        {BLOG.friends.map((friend: Friend) => {
          return (
            <Link
              href={friend.link}
              key={friend.name}
              className="group flex items-center gap-4 border-b border-hair py-4 transition-[padding] duration-[250ms] ease-out hover:pl-[9px] motion-reduce:transition-none"
            >
              <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full ring-1 ring-hair md:h-14 md:w-14">
                <Image
                  loader={({ src }) => src}
                  src={friend.avatar}
                  alt={friend.name}
                  placeholder="blur"
                  blurDataURL="/placeholder.svg"
                  unoptimized
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-col">
                <div className="truncate text-[15px] font-semibold transition-colors group-hover:text-clay">
                  {friend.name}
                </div>
                <div className="mt-0.5 truncate font-mono text-[11px] text-faint">
                  {friend.description}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}
