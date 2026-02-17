import { BLOG } from '@/blog.config'

const PageFooter = () => {
  return (
    <footer className="py-10 flex flex-col items-center justify-center text-center">
      <div className="w-8 h-px bg-light-300 dark:bg-dark-700 mb-6" />
      <div className="text-xs text-dark-400 dark:text-dark-400 tracking-wider">
        &copy; {BLOG.startYear}&ndash;{new Date().getFullYear()} {BLOG.nickname}
      </div>
    </footer>
  )
}

export default PageFooter
