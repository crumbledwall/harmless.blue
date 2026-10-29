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

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      // Phones: 18px icon with a 42px tap area (negative margin keeps it visually aligned).
      className="group/theme -m-3 cursor-pointer border-none bg-transparent p-3 text-muted transition-colors duration-300 hover:text-clay md:-m-1 md:p-1 md:text-faint"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[18px] w-[18px] transition-transform duration-700 ease-out-expo group-hover/theme:rotate-180 md:h-4 md:w-4"
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
        Below md: a masthead (avatar, name, tagline, theme toggle) over a row of tabs that sits on
        the bottom border; the active tab is underlined in clay. md+: rail pinned to the viewport;
        in very short windows it scrolls on its own, with the scrollbar hidden.
      */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 pt-6 md:sticky md:top-0 md:h-screen md:flex-col md:flex-nowrap md:items-stretch md:gap-0 md:overflow-y-auto md:scrollbar-none md:px-8 md:pb-10 md:pt-14">
        <Link
          href="/"
          className="group/brand mr-auto flex items-center gap-3 md:mr-0 md:flex-col md:items-start md:gap-0"
        >
          <span className="relative isolate block h-11 w-11 shrink-0 overflow-hidden rounded-full bg-hair ring-1 ring-hair md:h-12 md:w-12">
            {/* 64px source so the 2x image stays sharp at both 44px and 48px. */}
            <Image
              src={avatar}
              alt=""
              width={64}
              height={64}
              placeholder="blur"
              className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover/brand:scale-110"
            />
          </span>
          <span className="flex flex-col md:mt-5">
            <span className="text-[17px] font-bold tracking-[-0.01em] transition-colors duration-300 group-hover/brand:text-clay md:text-[15px]">
              {BLOG.nickname}
            </span>
            <span className="mt-0.5 font-mono text-[11px] tracking-[0.02em] text-muted md:mt-1.5">
              {BLOG.description}
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="order-last flex basis-full items-center gap-6 md:order-none md:mt-12 md:basis-auto md:flex-col md:items-stretch md:gap-0"
        >
          {NAV.map((item) => {
            const isActive = item.key === active
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                // py-3 gives every tab a 44px tap target; below md the active tab's 2px clay
                // underline covers the header's bottom border.
                className={`group/nav relative py-3 text-sm transition-colors duration-300 md:border-b md:border-hair ${
                  isActive
                    ? 'text-clay max-md:after:absolute max-md:after:inset-x-0 max-md:after:-bottom-px max-md:after:h-0.5 max-md:after:bg-clay'
                    : ''
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
            {BLOG.nickname}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  )
}

export default PageHeader
