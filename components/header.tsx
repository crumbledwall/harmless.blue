import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLink,
  faUserAstronaut,
  faBarsStaggered,
  faCircleHalfStroke
} from '@fortawesome/free-solid-svg-icons'
import { BLOG } from '@/blog.config'

const PageHeader = () => {
  const { resolvedTheme, setTheme } = useTheme()

  const changeTheme = () => {
    if (resolvedTheme === 'light') {
      return setTheme('dark')
    }
    return setTheme('light')
  }

  return (
    <header className="w-full pt-10 pb-8 text-dark-900 dark:text-dark-100">
      <div className="flex flex-col items-center gap-5">
        <Link href="/">
          <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden ring-1 ring-light-300/80 dark:ring-dark-600/80 shadow-sm hover:shadow-md transition-shadow">
            <Image
              src="/avatar.png"
              alt={`${BLOG.nickname}'s avatar`}
              fill
              placeholder="blur"
              blurDataURL="/placeholder.svg"
              className="cursor-pointer"
              priority
            />
          </div>
        </Link>
        <div className="flex flex-col items-center gap-1.5">
          <h1 className="text-lg md:text-xl font-bold font-serif tracking-wide">
            {BLOG.nickname}
          </h1>
          <p className="text-xs md:text-sm text-dark-400 dark:text-dark-300 tracking-widest">
            {BLOG.description}
          </p>
        </div>
        <nav className="flex flex-row items-center gap-6 mt-1" aria-label="Main navigation">
          <Link
            href="/"
            className="text-dark-500 dark:text-dark-300 hover:text-dark-900 dark:hover:text-dark-50 transition-colors relative group"
            aria-label="Posts"
          >
            <FontAwesomeIcon icon={faBarsStaggered} className="text-sm" />
            <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-dark-900 dark:bg-dark-100 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/friends"
            className="text-dark-500 dark:text-dark-300 hover:text-dark-900 dark:hover:text-dark-50 transition-colors relative group"
            aria-label="Friends"
          >
            <FontAwesomeIcon icon={faLink} className="text-sm" />
            <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-dark-900 dark:bg-dark-100 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/about"
            className="text-dark-500 dark:text-dark-300 hover:text-dark-900 dark:hover:text-dark-50 transition-colors relative group"
            aria-label="About"
          >
            <FontAwesomeIcon icon={faUserAstronaut} className="text-sm" />
            <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-dark-900 dark:bg-dark-100 group-hover:w-full transition-all duration-300" />
          </Link>
          <button
            type="button"
            onClick={changeTheme}
            className="text-dark-500 dark:text-dark-300 hover:text-dark-900 dark:hover:text-dark-50 transition-colors relative group bg-transparent border-none cursor-pointer p-0"
            aria-label="Toggle theme"
          >
            <FontAwesomeIcon icon={faCircleHalfStroke} className="text-sm" />
            <span className="absolute -bottom-1.5 left-0 w-0 h-px bg-dark-900 dark:bg-dark-100 group-hover:w-full transition-all duration-300" />
          </button>
        </nav>
      </div>
      <div className="mt-8 w-full flex items-center gap-4">
        <div className="flex-1 h-px bg-light-300 dark:bg-dark-700" />
        <div className="w-1 h-1 rounded-full bg-dark-400/50" />
        <div className="flex-1 h-px bg-light-300 dark:bg-dark-700" />
      </div>
    </header>
  )
}

export default PageHeader
