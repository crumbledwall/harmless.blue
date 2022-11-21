import React from 'react'
import { unified } from 'unified'
import parser from 'remark-parse'
import mdast2hast from 'remark-rehype'
import compiler from 'rehype-react'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'

export const parseMarkdown = (markdownBody: string) => {
  return unified()
    .use(mdast2hast)
    .use(parser)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .use(compiler, { createElement: React.createElement })
    .processSync(markdownBody).result
}
