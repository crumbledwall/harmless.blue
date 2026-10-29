import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import type { Root } from 'hast'

/**
 * Markdown -> highlighted hast, run in getStaticProps only, so the parser and
 * highlight.js never reach the browser. The result is passed to <Markdown /> as props.
 */
export async function markdownToHast(markdown: string): Promise<Root> {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    // Unknown fence languages render as plain code instead of failing the whole page.
    .use(rehypeHighlight, { ignoreMissing: true })

  const hast = await processor.run(processor.parse(markdown))

  // Source positions are only useful for tooling and roughly double the props size.
  // The JSON round-trip also guarantees the tree is serializable for Next.js props.
  return JSON.parse(JSON.stringify(hast, (key, value) => (key === 'position' ? undefined : value)))
}
