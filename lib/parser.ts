import React from 'react'
import { unified } from 'unified'
import parser from 'remark-parse'
import mdast2hast from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeReact from 'rehype-react'
import ImageWrapper from '@/components/image'

export const parseMarkdown = (markdownBody: string): React.ReactNode => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const file = (unified() as any)
    .use(parser)
    .use(mdast2hast)
    .use(rehypeHighlight)
    .use(rehypeReact, {
      createElement: React.createElement,
      components: {
        img: ImageWrapper,
      },
    })
    .processSync(markdownBody)

  return file.result as React.ReactNode
}
