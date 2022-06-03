import { getPostList, getPostContent } from './api'

const blogSlug = process.env.BLOG_SLUG
const aboutSlug = process.env.ABOUT_SLUG

export const getList = async () => {
  const res = await getPostList(blogSlug)
  return res.data
}

export const getPost = async (slug: string) => {
  const res = await getPostContent(`${blogSlug}/docs/${slug}`)
  const data = res.data

  return {
    title: data.title,
    content: data.body,
    time: data.created_at
  }
}

export const getAbout = async () => {
  const res = await getPostContent(aboutSlug)
  const data = res.data

  return {
    title: data.title,
    content: data.body,
    time: data.created_at
  }
}
