import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import type { Root } from 'hast'
import ImageWrapper from '@/components/image'

/** Renders a hast tree produced at build time by `markdownToHast`. */
export default function Markdown({ tree }: { tree: Root }) {
  return toJsxRuntime(tree, {
    Fragment,
    jsx,
    jsxs,
    components: { img: ImageWrapper as never },
  })
}
