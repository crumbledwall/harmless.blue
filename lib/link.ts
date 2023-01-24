import { BLOG } from '@/blog.config'

export const pageLink = (uri: string, type: 'page' | 'article') => {
  return type === 'page' ? `${BLOG.link}${uri}` : `${BLOG.link}posts/${uri}`
}
