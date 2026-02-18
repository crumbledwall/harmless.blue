import Layout from '@/components/layout'
import { getList } from '@/lib/notion'
import { timeFormat } from '@/lib/time'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BLOG } from '@/blog.config'

interface PostItem {
  id: string
  title: string | null
  description: string | null
  date: string | null
  tags: string[]
}

interface HomeProps {
  list: PostItem[]
  nextCursor: string | null
  hasMore: boolean
  cursors: string
}

export async function getServerSideProps(context: { query: { cursor?: string; cursors?: string } }) {
  const cursor = context.query.cursor || undefined
  const cursors = context.query.cursors || ''
  const { items, nextCursor, hasMore } = await getList(cursor)

  return {
    props: {
      list: items,
      nextCursor,
      hasMore,
      cursors,
    },
  }
}

export default function Home({ list, nextCursor, hasMore, cursors }: HomeProps) {
  const router = useRouter()
  const { cursor } = router.query

  // 解析游标历史
  const cursorHistory = cursors ? cursors.split(',').filter(Boolean) : []

  const handlePrev = () => {
    if (cursorHistory.length === 0) {
      // 没有历史，返回首页
      router.push('/')
    } else {
      // 取出上一个游标
      const prevCursors = cursorHistory.slice(0, -1)
      const prevCursor = cursorHistory[cursorHistory.length - 1]

      if (prevCursor === 'start') {
        // 返回第一页
        router.push('/')
      } else {
        // 返回上一页
        const newCursors = prevCursors.join(',')
        router.push({
          pathname: '/',
          query: {
            cursor: prevCursor,
            ...(newCursors && { cursors: newCursors }),
          },
        })
      }
    }
  }

  const handleNext = () => {
    if (!nextCursor) return

    // 记录当前游标到历史
    // 第一页时记录 'start' 作为标记
    const currentCursorInHistory = cursor || 'start'
    const newCursors = [...cursorHistory, currentCursorInHistory].join(',')

    router.push({
      pathname: '/',
      query: {
        cursor: nextCursor,
        cursors: newCursors,
      },
    })
  }

  const showPagination = list.length > 0 && (cursor || hasMore)
  const isPrevDisabled = cursorHistory.length === 0 && !cursor
  const isNextDisabled = !hasMore

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
        {showPagination && (
          <div className="flex justify-center items-center gap-8 mt-10 pt-8 border-t border-light-300/70 dark:border-dark-700/70">
            {!isPrevDisabled && (
              <button
                type="button"
                onClick={handlePrev}
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
              </button>
            )}

            {!isNextDisabled && (
              <button
                type="button"
                onClick={handleNext}
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
              </button>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}
