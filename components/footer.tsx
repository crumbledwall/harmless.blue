import { BLOG } from '@/blog.config'
const PageFooter = () => {
  return (
    <div className="h-24 flex flex-col items-center justify-center font-monospace dark:text-gray-300 text-xs md:text-sm text-center">
      Copyright @ {BLOG.startYear}-{new Date().getFullYear()} <br className="md:hidden" />
      Crumbledwall{' '}
    </div>
  )
}

export default PageFooter
