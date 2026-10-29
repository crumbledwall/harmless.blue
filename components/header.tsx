import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { BLOG } from '@/blog.config'

type Section = 'writing' | 'friends' | 'about'

interface HeaderProps {
  postCount?: number
}

const pad = (n: number) => String(n).padStart(2, '0')

const sectionOf = (pathname: string): Section | null => {
  if (pathname === '/friends') return 'friends'
  if (pathname === '/about') return 'about'
  if (pathname === '/' || pathname.startsWith('/page/') || pathname.startsWith('/posts/')) {
    return 'writing'
  }
  return null
}

const host = new URL(BLOG.link).host
const hostDot = host.lastIndexOf('.')

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="-m-1 cursor-pointer border-none bg-transparent p-1 text-muted transition-colors hover:text-clay md:text-faint"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <path d="M12 3.5a8.5 8.5 0 0 0 0 17z" fill="currentColor" />
      </svg>
    </button>
  )
}

const PageHeader = ({ postCount }: HeaderProps) => {
  const { pathname } = useRouter()
  const active = sectionOf(pathname)

  const nav: Array<{ key: Section; label: string; href: string; meta: string }> = [
    {
      key: 'writing',
      label: 'Writing',
      href: '/',
      meta: postCount === undefined ? '→' : pad(postCount)
    },
    { key: 'friends', label: 'Friends', href: '/friends', meta: pad(BLOG.friends.length) },
    { key: 'about', label: 'About', href: '/about', meta: '→' }
  ]

  return (
    <aside className="border-b border-hair md:border-b-0 md:border-r">
      {/* Mobile: one top bar. Desktop: sticky left rail. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4 md:sticky md:top-10 md:h-[calc(100vh-5rem)] md:flex-col md:flex-nowrap md:items-stretch md:gap-0 md:overflow-y-auto md:px-[30px] md:py-[42px]">
        <div className="mr-auto md:mr-0">
          <Link
            href="/"
            className="text-[15px] font-bold tracking-[-0.01em] transition-colors hover:text-clay"
          >
            {BLOG.nickname}
          </Link>
          <p className="mt-[5px] hidden font-mono text-[11px] tracking-[0.02em] text-muted md:block">
            {BLOG.description}
          </p>
        </div>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-4 md:mt-[42px] md:flex-col md:items-stretch md:gap-0.5"
        >
          {nav.map((item) => {
            const isActive = item.key === active
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`text-[13px] transition-colors hover:text-clay md:flex md:items-center md:justify-between md:border-b md:border-hair md:py-2.5 md:text-sm ${
                  isActive ? 'text-clay' : ''
                }`}
              >
                {item.label}
                <span
                  className={`hidden font-mono text-[11px] md:inline ${
                    isActive ? 'text-clay' : 'text-faint'
                  }`}
                >
                  {item.meta}
                </span>
              </Link>
            )
          })}
        </nav>

        <div className="flex items-end justify-between md:mt-auto md:pt-8">
          <div className="hidden font-mono text-[11px] leading-[2] text-faint md:block">
            EST. {BLOG.startYear}
            <br />
            {host.slice(0, hostDot)}
            <span className="text-clay">.</span>
            {host.slice(hostDot + 1)}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  )
}

export default PageHeader
