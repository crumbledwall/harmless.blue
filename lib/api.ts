const YUQUE_API = 'https://www.yuque.com/api/v2/repos'
const blogSlug = process.env.BLOG_SLUG

export const getPostList = async () => {
  const url = `${YUQUE_API}/${blogSlug}/docs`
  const res = await fetch(url, {
    headers: {
      'X-Auth-Token': process.env.YUQUE_TOKEN
    }
  })
  return res.json()
}

export const getPostContent = async (slug: string) => {
  const url = `${YUQUE_API}/${blogSlug}/docs/${slug}`
  const res = await fetch(url, {
    headers: {
      'X-Auth-Token': process.env.YUQUE_TOKEN
    }
  })
  return res.json()
}
