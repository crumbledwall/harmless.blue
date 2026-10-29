import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { BLOG } from '@/blog.config'
import avatar from '@/public/avatar.png'

type Section = 'writing' | 'friends' | 'about'

const NAV: Array<{ key: Section; label: string; href: string }> = [
  { key: 'writing', label: 'Writing', href: '/' },
  { key: 'friends', label: 'Friends', href: '/friends' },
  { key: 'about', label: 'About', href: '/about' }
]

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
      className="group/theme -m-1 cursor-pointer border-none bg-transparent p-1 text-muted transition-colors duration-300 hover:text-clay md:text-faint"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="transition-transform duration-700 ease-out-expo group-hover/theme:rotate-180"
      >
        <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <path d="M12 3.5a8.5 8.5 0 0 0 0 17z" fill="currentColor" />
      </svg>
    </button>
  )
}

const PageHeader = () => {
  const { pathname } = useRouter()
  const active = sectionOf(pathname)

  return (
    <aside className="border-b border-hair md:border-b-0 md:border-r">
      {/*
        Phones: brand + theme toggle on the first row, nav on its own row.
        sm: everything on one row. md+: rail pinned to the viewport.
      */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-5 pb-3 pt-4 sm:py-3.5 md:sticky md:top-0 md:h-screen md:flex-col md:flex-nowrap md:items-stretch md:gap-0 md:overflow-y-auto md:px-8 md:pb-10 md:pt-14">
        <div className="mr-auto md:mr-0">
          <Link
            href="/"
            className="group/brand flex items-center gap-2.5 md:flex-col md:items-start md:gap-0"
          >
            <span className="relative isolate block h-7 w-7 shrink-0 overflow-hidden rounded-full bg-hair ring-1 ring-hair md:h-12 md:w-12">
              <Image
                src={avatar}
                alt=""
                width={48}
                height={48}
                placeholder="blur"
                className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover/brand:scale-110"
              />
            </span>
            <span className="text-[15px] font-bold tracking-[-0.01em] transition-colors duration-300 group-hover/brand:text-clay md:mt-5">
              {BLOG.nickname}
            </span>
          </Link>
          <p className="mt-1.5 hidden font-mono text-[11px] tracking-[0.02em] text-muted md:block">
            {BLOG.description}
          </p>
        </div>

        <nav
          aria-label="Main navigation"
          className="order-last flex basis-full items-center gap-5 sm:order-none sm:basis-auto sm:gap-4 md:mt-12 md:flex-col md:items-stretch md:gap-0"
        >
          {NAV.map((item) => {
            const isActive = item.key === active
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`group/nav relative text-[13px] transition-colors duration-300 md:border-b md:border-hair md:py-3 md:text-sm ${
                  isActive ? 'text-clay' : ''
                }`}
              >
                {/* Same 14px clay bar as article headings; it draws in on hover and stays on the active page. */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1/2 hidden h-[2px] w-3.5 origin-left -translate-y-1/2 bg-clay transition-transform duration-500 ease-out-expo md:block ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'
                  }`}
                />
                <span
                  className={`inline-block transition-transform duration-500 ease-out-expo ${
                    isActive ? 'md:translate-x-6' : 'md:group-hover/nav:translate-x-6'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>

        <div className="flex items-end justify-between md:mt-auto md:pt-8">
          <div className="hidden font-mono text-[11px] leading-[2] text-faint md:block">
            {BLOG.startYear}&ndash;{new Date().getFullYear()}
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
