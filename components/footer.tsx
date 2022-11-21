import { BLOG } from '@/blog.config'
const PageFooter = () => {
  return (
    <div className="h-24 flex flex-col items-center justify-center font-monospace dark:text-light-700 text-sm md:text-base text-center">
      Copyright @ {BLOG.startYear}-{new Date().getFullYear()} <br className="md:hidden" />
      Crumbledwall{' '}
    </div>
  )
}

export default PageFooter
