import { getPostList, getPostContent } from './api'

export const getList = async () => {
  const res = await getPostList()
  return res.data
}

export const getPost = async (slug: string) => {
  const res = await getPostContent(slug)
  const data = res.data
  return {
    title: data.title,
    content: data.body,
    time: data.created_at
  }
}
