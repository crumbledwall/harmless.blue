import { BLOG } from '@/blog.config'

const PageFooter = () => {
  return (
    <footer className="mt-16 w-full border-t border-hair pt-6 font-mono text-[11px] tracking-[0.02em] text-faint">
      &copy; {BLOG.startYear}&ndash;{new Date().getFullYear()} {BLOG.nickname}
    </footer>
  )
}

export default PageFooter
