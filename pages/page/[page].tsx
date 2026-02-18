import Layout from '@/components/layout'
import { getAllPostsList, PAGE_SIZE } from '@/lib/notion'
import type { PostListItem } from '@/lib/notion'
import { timeFormat } from '@/lib/time'
import Link from 'next/link'
import { BLOG } from '@/blog.config'
import type { GetStaticPaths, GetStaticProps } from 'next'

interface PageProps {
  list: PostListItem[]
  currentPage: number
  totalPages: number
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const page = Number(params?.page)

  if (!page || page < 2 || !Number.isInteger(page)) {
    return { notFound: true }
  }

  const allPosts = await getAllPostsList()
  const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE))

  if (page > totalPages) {
    return { notFound: true }
  }

  const start = (page - 1) * PAGE_SIZE
  const list = allPosts.slice(start, start + PAGE_SIZE)

  return {
    props: {
      list,
      currentPage: page,
      totalPages,
    },
    revalidate: 3600,
  }
}

export default function Page({ list, currentPage, totalPages }: PageProps) {
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <Layout
      pageInfo={{
        pageName: BLOG.siteName,
        description: BLOG.siteName,
        link: BLOG.link,
        type: 'website',
      }}
    >
      <div className="flex-1 flex flex-col mt-6 mb-12 w-full">
        <div className="flex flex-col">
          {list.map((item, index) => {
            return (
              <Link
                key={item.id}
                href={`/posts/${item.id}`}
                className="no-underline text-dark-900 dark:text-dark-100 group"
              >
                <div className="py-6 pl-4 border-l-2 border-transparent group-hover:border-dark-400 dark:group-hover:border-dark-300 transition-colors">
                  <div className="text-xs text-dark-400 dark:text-dark-400 tracking-wider">
                    {timeFormat(item.date)}
                  </div>
                  <div className="mt-2 text-lg md:text-xl font-bold font-serif group-hover:text-dark-600 dark:group-hover:text-dark-50 transition-colors">
                    {item.title}
                  </div>
                  {item.description && (
                    <div className="mt-1.5 text-sm text-dark-500 dark:text-dark-300 line-clamp-2">
                      {item.description}
                    </div>
                  )}
                </div>
                {index < list.length - 1 && (
                  <div className="h-px bg-light-300/70 dark:bg-dark-700/70" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Pagination */}
        {(hasPrev || hasNext) && (
          <div className="flex justify-center items-center gap-8 mt-10 pt-8 border-t border-light-300/70 dark:border-dark-700/70">
            {hasPrev && (
              <Link
                href={currentPage === 2 ? '/' : `/page/${currentPage - 1}`}
                aria-label="上一页"
                className="group flex items-center justify-center w-10 h-10 rounded-full border border-light-300/50 dark:border-dark-600/50 transition-all duration-300 hover:border-dark-400 dark:hover:border-dark-400 hover:bg-dark-50 dark:hover:bg-dark-800"
              >
                <svg
                  className="w-5 h-5 text-dark-500 dark:text-dark-300 group-hover:text-dark-700 dark:group-hover:text-dark-100 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </Link>
            )}

            {hasNext && (
              <Link
                href={`/page/${currentPage + 1}`}
                aria-label="下一页"
                className="group flex items-center justify-center w-10 h-10 rounded-full border border-light-300/50 dark:border-dark-600/50 transition-all duration-300 hover:border-dark-400 dark:hover:border-dark-400 hover:bg-dark-50 dark:hover:bg-dark-800"
              >
                <svg
                  className="w-5 h-5 text-dark-500 dark:text-dark-300 group-hover:text-dark-700 dark:group-hover:text-dark-100 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}
