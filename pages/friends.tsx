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
      <h1 className="border-b-2 border-ink pb-[22px] text-[13px] font-semibold uppercase tracking-[0.26em]">
        Friends
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
        {BLOG.friends.map((friend: Friend) => {
          return (
            <Link
              href={friend.link}
              key={friend.name}
              className="group flex items-center gap-4 border-b border-hair py-4"
            >
              <div className="relative isolate h-11 w-11 shrink-0 overflow-hidden rounded-full bg-hair ring-1 ring-hair md:h-14 md:w-14">
                <Image
                  loader={({ src }) => src}
                  src={friend.avatar}
                  alt={friend.name}
                  placeholder="blur"
                  blurDataURL="/placeholder.svg"
                  unoptimized
                  fill
                  sizes="56px"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="truncate text-[15px] font-semibold">
                  <span className="sweep group-hover:text-clay">{friend.name}</span>
                </div>
                <div className="mt-0.5 truncate font-mono text-[11px] text-faint">
                  {friend.description}
                </div>
              </div>
              <span
                aria-hidden="true"
                className="-translate-x-1 translate-y-1 font-mono text-xs text-clay opacity-0 transition duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
              >
                &#8599;
              </span>
            </Link>
          )
        })}
      </div>
    </Layout>
  )
}
