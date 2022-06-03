import React from 'react'
import { unified } from 'unified'
import parser from 'remark-parse'
import mdast2hast from 'remark-rehype'
import compiler from 'rehype-react'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'

export const parseMarkdown = (markdownBody: string) => {
  markdownBody = filterImage(markdownBody)
  markdownBody = filterLink(markdownBody)
  markdownBody = filterNewline(markdownBody)

  return unified()
    .use(mdast2hast)
    .use(parser)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .use(compiler, { createElement: React.createElement })
    .processSync(markdownBody).result
}

// remove title link in yuque api
export const filterLink = (body: string) => {
  return body.replaceAll(/<a.+?><\/a>\n/g, '')
}

// remove image hash
export const filterImage = (body: string) => {
  return body.replaceAll(/!\[(.+?)\]\((.+?)#.+?\)/g, '![$1]($2)')
}

// turning br tag to line breaks
export const filterNewline = (body: string) => {
  return body.replaceAll('<br />', '\n\n')
}
