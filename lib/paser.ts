import React from 'react'
import { unified } from 'unified'
import parser from 'remark-parse'
import mdast2hast from 'remark-rehype'
import compiler from 'rehype-react'

export const parseMarkdown = (markdown: string) => {
  return unified()
    .use(parser)
    .use(mdast2hast)
    .use(compiler, { createElement: React.createElement })
    .processSync(filterImage(filterLink(markdown))).result
}

export const filterLink = (body: string) => {
  return body.replaceAll(/<a.+?><\/a>\n/g, '')
}

export const filterImage = (body: string) => {
  return body.replaceAll(/!\[(.+?)\]\((.+?)#.+?\)/g, '![$1]($2)')
}
