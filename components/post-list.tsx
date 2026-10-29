import Link from 'next/link'
import type { PostListItem } from '@/lib/notion'
import { timeFormat } from '@/lib/time'

interface PostListProps {
  list: PostListItem[]
  /** Number of posts before this page, so row numbers continue across pages. */
  offset: number
  currentPage: number
  totalPages: number
}

const pad = (n: number) => String(n).padStart(2, '0')

const pagerClass =
  'group flex h-10 w-10 items-center justify-center rounded-full border border-hair text-muted transition-colors duration-300 hover:border-clay hover:text-clay'

export default function PostList({ list, offset, currentPage, totalPages }: PostListProps) {
  const hasPrev = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <div className="mb-12 flex w-full flex-col">
      <h1 className="border-b-2 border-ink pb-[22px] text-[13px] font-semibold uppercase tracking-[0.26em]">
        Writing
      </h1>

      <div className="flex flex-col">
        {list.map((item, index) => (
          <Link
            key={item.id}
            href={`/posts/${item.id}`}
            className="group grid grid-cols-[28px_minmax(0,1fr)] gap-x-3 border-b border-hair py-6 md:grid-cols-[40px_minmax(0,1fr)_auto] md:gap-x-5"
          >
            {/* Row number rolls up and an arrow rolls in from below. */}
            <span
              aria-hidden="true"
              className="relative mt-[5px] block h-4 overflow-hidden font-mono text-xs leading-4 text-faint"
            >
              <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
                {pad(offset + index + 1)}
              </span>
              <span className="absolute inset-x-0 top-full block text-clay transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
                &rarr;
              </span>
            </span>
            <div className="min-w-0">
              <h2 className="text-[17px] font-semibold leading-normal tracking-[-0.005em] md:text-lg">
                <span className="sweep group-hover:text-clay">{item.title}</span>
              </h2>
              {item.description && (
                <p className="mt-1.5 line-clamp-2 max-w-[52ch] text-[13px] leading-[1.7] text-muted">
                  {item.description}
                </p>
              )}
            </div>
            <div className="col-start-2 mt-2 font-mono text-[11px] leading-[2] text-muted transition-colors duration-300 group-hover:text-ink md:col-start-auto md:mt-0 md:max-w-[180px] md:pt-1 md:text-right">
              {item.date && <time dateTime={item.date}>{timeFormat(item.date)}</time>}
              {item.tags.length > 0 && (
                <span className="ml-2 text-faint md:ml-0 md:block">{item.tags.join(' · ')}</span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {(hasPrev || hasNext) && (
        <div className="mt-10 flex items-center justify-center gap-8">
          {hasPrev && (
            <Link
              href={currentPage === 2 ? '/' : `/page/${currentPage - 1}`}
              aria-label="上一页"
              className={pagerClass}
            >
              <svg
                className="h-5 w-5 transition-transform duration-500 ease-out-expo group-hover:-translate-x-0.5"
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
            <Link href={`/page/${currentPage + 1}`} aria-label="下一页" className={pagerClass}>
              <svg
                className="h-5 w-5 transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5"
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
  )
}
