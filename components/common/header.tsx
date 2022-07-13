import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLink,
  faUserAstronaut,
  faBarsStaggered,
  faSun,
  faMoon
} from '@fortawesome/free-solid-svg-icons'
import { BLOG } from '@/blog.config'

const PageHeader = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => setHasMounted(true), [])

  return (
    <div className="w-full flex flex-col justify-center border-b-2 border-light-900 dark:border-dark-50 dark:text-light-700">
      <div className="w-full">
        <div className="flex items-center gap-8 px-4 py-5 w-full flex-col md:flex-row md:pb-0">
          <div>
            <Link href="/">
              <div className="relative h-20 w-20 md:(h-32 w-32) rounded-full">
                <Image
                  src="/avatar.png"
                  alt="avatar"
                  layout="fill"
                  placeholder={'blur'}
                  blurDataURL="/placeholder.svg"
                  className="rounded-full cursor-pointer"
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
          <Link href="/">
            <label title="Posts">
              <div className="text-lg cursor-pointer flex items-center gap-2">
                <FontAwesomeIcon icon={faBarsStaggered} />
              </div>
            </label>
          </Link>
          <Link href="/friends">
            <label title="Friends">
              <div className="text-lg cursor-pointer flex items-center gap-2">
                <FontAwesomeIcon icon={faLink} />
              </div>
            </label>
          </Link>
          <Link href="/about">
            <label title="About">
              <div className="text-lg cursor-pointer flex items-center gap-2">
                <FontAwesomeIcon icon={faUserAstronaut} />
              </div>
            </label>
          </Link>
          {hasMounted && (
            <label title="Theme">
              <div className="text-lg cursor-pointer flex items-center gap-2">
                {resolvedTheme === 'light' ? (
                  <FontAwesomeIcon
                    icon={faSun}
                    onClick={() => {
                      setTheme('dark')
                    }}
                  />
                ) : null}
                {resolvedTheme === 'dark' ? (
                  <FontAwesomeIcon
                    icon={faMoon}
                    onClick={() => {
                      setTheme('light')
                    }}
                  />
                ) : null}
              </div>
            </label>
          )}
        </div>
      </div>
    </div>
  )
}

export default PageHeader
