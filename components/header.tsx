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
    <div className="w-full flex flex-col pt-4 justify-center border-b-2 border-light-900 dark:border-dark-50 dark:text-light-700">
      <div className="w-full">
        <div className="flex items-center gap-8 px-4 py-5 w-full flex-col md:flex-row md:pb-0">
          <div>
            <Link href="/">
              <div className="relative h-16 w-16 md:(h-28 w-28) rounded-full overflow-hidden">
                <Image
                  src="/avatar.png"
                  alt="avatar"
                  fill
                  placeholder={'blur'}
                  blurDataURL="/placeholder.svg"
                  className="cursor-pointer"
                  priority={true}
                />
              </div>
            </Link>
          </div>
          <div className="w-full flex flex-col items-center md:items-start">
            <div className="font-bold sm:text-xl md:text-3xl font-serif text-center">
              {BLOG.nickname}
            </div>
            <div className="font-monospace text-sm md:text-base">{BLOG.description}</div>
          </div>
        </div>
      </div>
      <div className="mx-4 mb-4 flex items-center justify-center md:justify-end">
        <div className="flex flex-row gap-4 font-bold font-monospace">
          <Link href="/" className="text-dark-100 dark:text-light-700">
            <label title="Posts">
              <div className="text-lg cursor-pointer flex items-center gap-2">
                <FontAwesomeIcon icon={faBarsStaggered} />
              </div>
            </label>
          </Link>
          <Link href="/friends" className="text-dark-100 dark:text-light-700">
            <label title="Friends">
              <div className="text-lg cursor-pointer flex items-center gap-2">
                <FontAwesomeIcon icon={faLink} />
              </div>
            </label>
          </Link>
          <Link href="/about" className="text-dark-100 dark:text-light-700">
            <label title="About">
              <div className="text-lg cursor-pointer flex items-center gap-2">
                <FontAwesomeIcon icon={faUserAstronaut} />
              </div>
            </label>
          </Link>
          <label title="Theme" className="text-dark-100 dark:text-light-700">
            <div className="text-lg cursor-pointer flex items-center gap-2">
              <FontAwesomeIcon icon={faCircleHalfStroke} onClick={changeTheme} />
            </div>
          </label>
        </div>
      </div>
    </div>
  )
}

export default PageHeader
