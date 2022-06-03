import { BLOG } from '@/blog.config'
const PageFooter = () => {
  return (
    <div className="h-24 flex flex-col items-center justify-center">
      Copyright @ {BLOG.startYear}-{new Date().getFullYear()} Crumbledwall{' '}
    </div>
  )
}

export default PageFooter
